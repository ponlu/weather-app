import axios from "axios";
import { ICoord, IForecastResponse } from "../../interfaces/IForecastResponse";

const openWeatherAPIKey = process.env.OPEN_WEATHER_API_KEY;

export async function getForecast(coordinates: ICoord) {
  let endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${openWeatherAPIKey}`;
  let { data } = await axios.get<IForecastResponse>(endpoint);
  return data;
}

export async function getCoordinatesByZip(country: string, zip: string) {
  let endpoint = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${openWeatherAPIKey}`;
  let { data } = await axios.get(endpoint);
  return data;
}

export async function getCoordinatesByCity(country: string, city: string, limit = 1) {
  let endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=${limit}&appid=${openWeatherAPIKey}`;
  let { data } = await axios.get(endpoint);
  return data;
}
