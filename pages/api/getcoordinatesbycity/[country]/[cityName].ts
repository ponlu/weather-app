import type { NextApiRequest, NextApiResponse } from "next";
import { getCoordinatesByCity } from "../../../../lib/server/OpenWeatherAPI";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { country, cityName } = req.query;

    const coordinates = await getCoordinatesByCity(country as string, cityName as string);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(500).end();
  }
}
