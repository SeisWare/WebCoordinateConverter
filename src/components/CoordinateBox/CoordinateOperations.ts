import proj4 from 'proj4';
import wktcrs from "wkt-crs";

function isValid(value : number) : boolean
{
    return !isNaN(value) && isFinite(value);
}

function formatGrids(input : string) : string
{
    return input.replace(/\bnadgrids=\b([^\s]+)\w+/g, (grids) => grids + ",null");
}

export async function ConvertXYToXY(sourceWKT : ICoordinateSystem, destinationWKT : ICoordinateSystem, inputXY : number[]) : Promise<number[]>
{
    let converted = [0.0, 0.0];
    const inputIsValid = inputXY.every(isValid);
    if(sourceWKT === null || destinationWKT === null || !inputIsValid)
    {
        return converted;
    }

    try
    {
        const stuff = formatGrids(destinationWKT.proj4);
        const converter = proj4(sourceWKT.proj4, formatGrids(destinationWKT.proj4));
        converted = converter.forward(inputXY);
    }
    catch(err)
    {
        console.error(err);
        converted = [0.0, 0.0];
    }

    return converted;
}

export async function ConvertXYToLL(system : ICoordinateSystem, inputXY : number[]) : Promise<number[]>
{
    const inputIsValid = inputXY.every(isValid);
    if(system === null || system.wkt === null ||!inputIsValid)
    {
        return [0.0, 0.0];
    }

    const { data } = wktcrs.parse(system.wkt);
    if(data.PROJCS && data.PROJCS.GEOGCS)
    {
        const localConverter = proj4(system.wkt);
        const llValue = localConverter.inverse(inputXY);
        return llValue;
    }

    return [0.0, 0.0];
}

