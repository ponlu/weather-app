import { useEffect, useState } from "react";
import { IForecastResponse } from "../interfaces/IForecastResponse";
import Forecast from "./Forecast";
import { IUpcomingForecasts } from "../interfaces/IUpcomingForecasts";
import ForecastToday from "./ForecastToday";

function ForecastCollection({ forecastResponse }: { forecastResponse: IForecastResponse }) {
  const [upcomingForecast, setUpcomingForecast] = useState<IUpcomingForecasts>();

  useEffect(() => {
    const day1 = new Date(forecastResponse.list[0].dt_txt).getDay();
    const upcomingForecast: IUpcomingForecasts = {
      day1: forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDay() === day1),
      day2: forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDay() === day1 + 1),
      day3: forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDay() === day1 + 2),
      day4: forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDay() === day1 + 3),
      day5: forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDay() === day1 + 4),
    };
    setUpcomingForecast(upcomingForecast);
  }, [forecastResponse]);

  if (upcomingForecast) {
    return (
      <div className="grid grid-cols-4 w-full">
        <ForecastToday forecasts={upcomingForecast.day1} city={forecastResponse.city} />
        <Forecast forecasts={upcomingForecast.day2} />
        <Forecast forecasts={upcomingForecast.day3} />
        <Forecast forecasts={upcomingForecast.day4} />
        <Forecast forecasts={upcomingForecast.day5} />
      </div>
    );
  } else return <div />;
}

export default ForecastCollection;
