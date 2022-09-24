import type { NextApiRequest, NextApiResponse } from "next";
import { getCoordinatesByZip } from "../../../../lib/server/OpenWeatherAPI";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { country, zip } = req.query;

    const coordinates = await getCoordinatesByZip(country as string, zip as string);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(500).end();
  }
}
