import type { NextApiRequest, NextApiResponse } from "next";
import { ICoord } from "../../../../interfaces/IForecastResponse";
import { getCoordinatesByCity } from "../../../../lib/server/OpenWeatherAPI";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ICoord | null>) {
  try {
    const { country, cityName } = req.query;

    const coordinates = await getCoordinatesByCity(country as string, cityName as string);
    res.status(200).json(coordinates);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
