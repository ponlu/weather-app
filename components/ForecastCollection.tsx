import { useState } from "react";
import { IForecastResponse, IForecastList } from "../interfaces/IForecastResponse";
import { addDays, convertDateToIPhoneFormat } from "../lib/helper";
import Forecast from "./Forecast";

function ForecastCollection({ forecastResponse }: { forecastResponse: IForecastResponse }) {
  const day1 = convertDateToIPhoneFormat(forecastResponse.list[0].dt_txt);
  const upcomingForecast: IForecastList[][] = [
    forecastResponse.list.filter((forecast) => convertDateToIPhoneFormat(forecast.dt_txt).getDate() === day1.getDate()),
    forecastResponse.list.filter(
      (forecast) => convertDateToIPhoneFormat(forecast.dt_txt).getDate() === addDays(day1, 1).getDate()
    ),
    forecastResponse.list.filter(
      (forecast) => convertDateToIPhoneFormat(forecast.dt_txt).getDate() === addDays(day1, 2).getDate()
    ),
    forecastResponse.list.filter(
      (forecast) => convertDateToIPhoneFormat(forecast.dt_txt).getDate() === addDays(day1, 3).getDate()
    ),
    forecastResponse.list.filter(
      (forecast) => convertDateToIPhoneFormat(forecast.dt_txt).getDate() === addDays(day1, 4).getDate()
    ),
  ];
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="forecastlist">
      {upcomingForecast.map((forecastList, index) => (
        <Forecast
          key={forecastList[0].dt}
          forecasts={forecastList}
          city={forecastResponse.city}
          selected={selectedDay === index + 1}
          setSelected={() => setSelectedDay(index + 1)}
        />
      ))}
    </div>
  );
}

export default ForecastCollection;
