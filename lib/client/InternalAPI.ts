import axios from "axios";
import { ICityResponse } from "../../interfaces/ICityResponse";
import { ICoord, IForecastResponse } from "../../interfaces/IForecastResponse";
import { IZipResponse } from "../../interfaces/IZipResponse";

export async function getForecast(coordinates: ICoord): Promise<IForecastResponse | null> {
  try {
    let endpoint = `api/getforecast/${coordinates.lat}/${coordinates.lon}`;
    let { data } = await axios.get<IForecastResponse>(endpoint);
    if (data) return data;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCoordinatesByZip(country: string, zip: string): Promise<ICoord | null> {
  if (!country || !zip) return null;
  try {
    let endpoint = `api/getcoordinatesbyzip/${country}/${zip}`;
    let { data } = await axios.get<IZipResponse>(endpoint);
    if (data) return { lat: data.lat, lon: data.lon };
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCoordinatesByCity(country: string, city: string): Promise<ICoord | null> {
  if (!country || !city) return null;
  try {
    let endpoint = `api/getcoordinatesbycity/${country}/${city}`;
    let { data } = await axios.get<ICityResponse>(endpoint);
    if (data) return { lat: data.lat, lon: data.lon };
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
