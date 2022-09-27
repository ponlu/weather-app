import { useState } from "react";
import { IForecastResponse, IList } from "../interfaces/IForecastResponse";
import { addDays } from "../lib/helper";
import Forecast from "./Forecast";

function ForecastCollection({ forecastResponse }: { forecastResponse: IForecastResponse }) {
  const day1 = new Date(forecastResponse.list[0].dt_txt);
  const upcomingForecast: IList[][] = [
    forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDate() === day1.getDate()),
    forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDate() === addDays(day1, 1).getDate()),
    forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDate() === addDays(day1, 2).getDate()),
    forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDate() === addDays(day1, 3).getDate()),
    forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDate() === addDays(day1, 4).getDate()),
  ];
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="forecastlist">
      {upcomingForecast.map((forecast, index) => (
        <Forecast
          key={index}
          forecasts={forecast}
          city={forecastResponse.city}
          selected={selectedDay === index + 1}
          setSelected={() => setSelectedDay(index + 1)}
        />
      ))}
    </div>
  );
}

export default ForecastCollection;
