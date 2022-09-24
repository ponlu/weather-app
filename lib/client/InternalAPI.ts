import axios from "axios";
import { ICoord, IForecastResponse } from "../../interfaces/IForecastResponse";

export async function getForecast(coordinates: ICoord) {
  let endpoint = `api/getforecast/${coordinates.lat}/${coordinates.lon}`;
  let { data } = await axios.get<IForecastResponse>(endpoint);
  return data;
}

export async function getCoordinatesByZip(country: string, zip: string) {
  let endpoint = `api/getcoordinatesbyzip/${country}/${zip}`;
  let { data } = await axios.get(endpoint);
  return data;
}

export async function getCoordinatesByCity(country: string, city: string) {
  let endpoint = `api/getcoordinatesbycity/${country}/${city}`;
  let { data } = await axios.get(endpoint);
  return data;
}
