import { IList } from "./IForecastResponse";

export interface IUpcomingForecasts {
  day1: IList[];
  day2: IList[];
  day3: IList[];
  day4: IList[];
  day5: IList[];
}
