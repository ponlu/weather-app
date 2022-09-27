import { useState } from "react";
import { IForecastResponse, IForecastList } from "../interfaces/IForecastResponse";
import { addDays, getIPhoneFormattedDate } from "../lib/helper";
import Forecast from "./Forecast";

const FORECAST_DAYS = 5;

function ForecastCollection({ forecastResponse }: { forecastResponse: IForecastResponse }) {
  const day1 = getIPhoneFormattedDate(forecastResponse.list[0].dt_txt);

  const upcomingForecast: IForecastList[][] = new Array(FORECAST_DAYS)
    .fill(0)
    .map((_, index) =>
      forecastResponse.list.filter(
        (forecast) => getIPhoneFormattedDate(forecast.dt_txt).getDate() === addDays(day1, index).getDate()
      )
    );

  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="forecastlist">
      <h1 className="text-white text-center text-3xl">{forecastResponse.city.name}</h1>
      {upcomingForecast.map((forecastList, index) => (
        <Forecast
          key={forecastList[0].dt}
          forecasts={forecastList}
          selected={selectedDay === index + 1}
          setSelected={() => setSelectedDay(index + 1)}
        />
      ))}
    </div>
  );
}

export default ForecastCollection;
