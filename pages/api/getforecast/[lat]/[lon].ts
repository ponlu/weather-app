import type { NextApiRequest, NextApiResponse } from "next";
import { IForecastResponse } from "../../../../interfaces/IForecastResponse";
import { getForecast } from "../../../../lib/server/OpenWeatherAPI";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IForecastResponse | null>) {
  try {
    const { lat, lon } = req.query;

    const forecast = await getForecast({ lat: Number(lat), lon: Number(lon) });
    res.status(200).json(forecast);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
