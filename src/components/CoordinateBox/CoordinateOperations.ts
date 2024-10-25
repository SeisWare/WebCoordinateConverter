import proj4 from 'proj4';
import wktcrs from "wkt-crs";
export async function ConvertXYToXY(sourceWKT : string, destinationWKT : string, inputXY : number[]) : Promise<number[]>
{
    if(sourceWKT === null || destinationWKT === null || isNaN(inputXY[0]) || isNaN(inputXY[1]))
    {
        return [0.0, 0.0];
    }

    const converted = proj4(sourceWKT, destinationWKT, inputXY);
    return converted;
}

export async function ConvertXYToLL(wkt : string, inputXY : number[]) : Promise<number[]>
{
    if(wkt === null || isNaN(inputXY[0]) || isNaN(inputXY[1]))
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

