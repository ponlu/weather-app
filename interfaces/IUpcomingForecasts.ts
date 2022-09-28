import { IForecast } from "./IForecastResponse";

export interface IUpcomingForecasts {
  day1: IForecast[];
  day2: IForecast[];
  day3: IForecast[];
  day4: IForecast[];
  day5: IForecast[];
}
