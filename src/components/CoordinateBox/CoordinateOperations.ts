import proj4 from 'proj4';
import wktcrs from "wkt-crs";

function isValid(value : number) : boolean
{
    return !isNaN(value) && isFinite(value);
}

export async function ConvertXYToXY(sourceWKT : string, destinationWKT : string, inputXY : number[]) : Promise<number[]>
{
    let converted = [0.0, 0.0];
    const inputIsValid = inputXY.every(isValid);
    if(sourceWKT === null || destinationWKT === null || !inputIsValid)
    {
        return converted;
    }

    try
    {
        const converter = proj4(sourceWKT, destinationWKT);
        converted = converter.forward(inputXY);
    }
    catch(err)
    {
        console.error(err);
    }

    return converted;
}

export async function ConvertXYToLL(wkt : string, inputXY : number[]) : Promise<number[]>
{
    const inputIsValid = inputXY.every(isValid);
    if(wkt === null || !inputIsValid)
    {
        return [0.0, 0.0];
    }

    const { data } = wktcrs.parse(wkt);
    if(data.PROJCS && data.PROJCS.GEOGCS)
    {
        const localConverter = proj4(wkt);
        const llValue = localConverter.inverse(inputXY);
        return llValue;
    }

    return [0.0, 0.0];
}

