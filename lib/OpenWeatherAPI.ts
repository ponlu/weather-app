import axios from "axios";
import { ICoord, IForecastResponse } from "../interfaces/IForecastResponse";

const openWeatherAPIKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

export async function getForecast(coordinates: ICoord) {
  let endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${openWeatherAPIKey}`;
  let { data } = await axios.get<IForecastResponse>(endpoint);
  return data;
}
