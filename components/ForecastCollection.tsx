import { useEffect, useState } from "react";
import { IForecastResponse } from "../interfaces/IForecastResponse";
import Forecast from "./Forecast";
import { IUpcomingForecasts } from "../interfaces/IUpcomingForecasts";
import ForecastToday from "./ForecastToday";

function ForecastCollection({ forecastResponse }: { forecastResponse: IForecastResponse }) {
  const [upcomingForecast, setUpcomingForecast] = useState<IUpcomingForecasts>();
  const [isHovering, setIsHovering] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    const day1 = new Date(forecastResponse.list[0].dt_txt).getDate();
    const upcomingForecast: IUpcomingForecasts = {
      day1: forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDate() === day1),
      day2: forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDate() === day1 + 1),
      day3: forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDate() === day1 + 2),
      day4: forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDate() === day1 + 3),
      day5: forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDate() === day1 + 4),
    };
    setUpcomingForecast(upcomingForecast);
  }, [forecastResponse]);

  if (upcomingForecast) {
    return (
      <div className="forecastlist">
        <div onClick={() => setSelectedDay(1)}>
          <ForecastToday forecasts={upcomingForecast.day1} city={forecastResponse.city} selected={selectedDay === 1} />
        </div>
        <div onClick={() => setSelectedDay(2)}>
          <ForecastToday forecasts={upcomingForecast.day2} city={forecastResponse.city} selected={selectedDay === 2} />
        </div>
        <div onClick={() => setSelectedDay(3)}>
          <ForecastToday forecasts={upcomingForecast.day3} city={forecastResponse.city} selected={selectedDay === 3} />
        </div>
        <div onClick={() => setSelectedDay(4)}>
          <ForecastToday forecasts={upcomingForecast.day4} city={forecastResponse.city} selected={selectedDay === 4} />
        </div>
        <div onClick={() => setSelectedDay(5)}>
          <ForecastToday forecasts={upcomingForecast.day5} city={forecastResponse.city} selected={selectedDay === 5} />
        </div>

        {/* <Forecast forecasts={upcomingForecast.day2} />
        <Forecast forecasts={upcomingForecast.day3} />
        <Forecast forecasts={upcomingForecast.day4} />
        <Forecast forecasts={upcomingForecast.day5} /> */}
      </div>
    );
  } else return <div />;
}

export default ForecastCollection;
