import { useState } from "react";
import { IForecastResponse, IList } from "../interfaces/IForecastResponse";
import Forecast from "./Forecast";

function ForecastCollection({ forecastResponse }: { forecastResponse: IForecastResponse }) {
  const day1 = new Date(forecastResponse.list[0].dt_txt).getDate();
  const upcomingForecast: IList[][] = [
    forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDate() === day1),
    forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDate() === day1 + 1),
    forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDate() === day1 + 2),
    forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDate() === day1 + 3),
    forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDate() === day1 + 4),
  ];

  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="forecastlist">
      {upcomingForecast.map((forecast, index) => (
        <Forecast
          key={forecast[0].dt}
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
