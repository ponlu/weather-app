import { IWeather } from "./IForecastResponse";

export interface IForecast {
  maxTemperature: number;
  minTemperature: number;
  feelsLike: number;
  rain: number;
  humidity: number;
  pressure: number;
  wind: number;
  weather: IWeather;
  day: string;
}
