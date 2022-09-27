import { IForecastList } from "./IForecastResponse";

export interface IUpcomingForecasts {
  day1: IForecastList[];
  day2: IForecastList[];
  day3: IForecastList[];
  day4: IForecastList[];
  day5: IForecastList[];
}
