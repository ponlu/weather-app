import axios from "axios";
import { ICityResponse } from "../../interfaces/ICityResponse";
import { ICoord, IForecastResponse } from "../../interfaces/IForecastResponse";
import { IZipResponse } from "../../interfaces/IZipResponse";

export async function getForecast(coordinates: ICoord): Promise<IForecastResponse | null> {
  let endpoint = `api/getforecast/${coordinates.lat}/${coordinates.lon}`;
  let { data } = await axios.get<IForecastResponse>(endpoint);
  return data;
}

export async function getCoordinatesByZip(country: string, zip: string): Promise<ICoord | null> {
  let endpoint = `api/getcoordinatesbyzip/${country}/${zip}`;
  let { data } = await axios.get<IZipResponse>(endpoint);
  if (data) return { lat: data.lat, lon: data.lon };
  return null;
}

export async function getCoordinatesByCity(country: string, city: string): Promise<ICoord | null> {
  let endpoint = `api/getcoordinatesbycity/${country}/${city}`;
  let { data } = await axios.get<ICityResponse>(endpoint);
  if (data) return { lat: data.lat, lon: data.lon };
  return null;
}
