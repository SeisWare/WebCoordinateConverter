import proj4 from 'proj4';
import wktcrs from "wkt-crs";
import './ICoordinateSystem.ts';

function isValid(value : number) : boolean
{
    return !isNaN(value) && isFinite(value);
}

function formatGrids(input : string) : string
{
    return input.replace(/\bnadgrids=\b([^\s]+)\w+/g, (grids) => grids + ",null");
}

export async function ConvertXYToXY(source : ICoordinateSystem, destination : ICoordinateSystem, inputXY : number[]) : Promise<number[]>
{
    let converted = [0.0, 0.0];
    const inputIsValid = inputXY.every(isValid);
    if(source === null || destination === null || !inputIsValid)
    {
        return converted;
    }

    const formattedSource = formatGrids(source.proj4);
    const formattedDestination = formatGrids(destination.proj4);
    const converter = proj4(formattedSource, formattedDestination);
    converted = converter.forward(inputXY);

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

