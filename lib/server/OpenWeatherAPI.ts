import axios from "axios";
import { IZipResponse } from "../../interfaces/IZipResponse";
import { ICityResponse } from "../../interfaces/ICityResponse";
import { ICoord, IForecastResponse } from "../../interfaces/IForecastResponse";

const openWeatherAPIKey = process.env.OPEN_WEATHER_API_KEY;

export async function getForecast(coordinates: ICoord): Promise<IForecastResponse | null> {
  try {
    let endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${openWeatherAPIKey}`;
    let { data } = await axios.get<IForecastResponse>(endpoint);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCoordinatesByZip(country: string, zip: string): Promise<ICoord | null> {
  try {
    let endpoint = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${openWeatherAPIKey}`;
    let { data } = await axios.get<IZipResponse>(endpoint);
    if (data) return { lat: data.lat, lon: data.lon };
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCoordinatesByCity(country: string, city: string, limit = 5): Promise<ICoord | null> {
  try {
    let endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=${limit}&appid=${openWeatherAPIKey}`;
    let { data } = await axios.get<ICityResponse[]>(endpoint);
    if (data && data.length > 0) return { lat: data[0].lat, lon: data[0].lon };
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
