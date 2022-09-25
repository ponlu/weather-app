import { useEffect, useState } from "react";
import { ICoord, IForecastResponse, IList } from "../interfaces/IForecastResponse";
import Forecast from "./Forecast";
import { IUpcomingForecasts } from "../interfaces/IUpcomingForecasts";
import ForecastToday from "./ForecastToday";

function ForecastCollection({ forecastResponse }: { forecastResponse: IForecastResponse }) {
  const day1 = new Date(forecastResponse.list[0].dt_txt).getDay();
  const upcomingForecast: IUpcomingForecasts = {
    day1: forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDay() === day1),
    day2: forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDay() === day1 + 1),
    day3: forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDay() === day1 + 2),
    day4: forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDay() === day1 + 3),
    day5: forecastResponse.list.filter((forecast) => new Date(forecast.dt_txt).getDay() === day1 + 4),
  };

  // const groupForecastsByDay = (forecasts: IList[]) => {
  //   const today = new Date().getDay();

  //   const upcomingForecast: IUpcomingForecasts = {
  //     day1: forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today),
  //     day2: forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today + 1),
  //     day3: forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today + 2),
  //     day4: forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today + 3),
  //     day5: forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today + 4),
  //   };

  //   const upcomingForecastList: IList[][] = [
  //     forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today),
  //     forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today + 1),
  //     forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today + 2),
  //     forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today + 3),
  //     forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today + 4),
  //   ];

  //   return upcomingForecast;
  // };

  // const createForecastComponent = (item: IList[], index: number) => {
  //   if (index === 0) return <ForecastToday key={index} forecasts={item} city={forecastResponse.city} />;
  //   return <Forecast key={index} forecasts={item} city={forecastResponse.city} />;
  // };

  return (
    <div className="grid grid-cols-4 w-full">
      <ForecastToday forecasts={upcomingForecast.day1} city={forecastResponse.city} />
      <Forecast forecasts={upcomingForecast.day2} city={forecastResponse.city} />
      <Forecast forecasts={upcomingForecast.day3} city={forecastResponse.city} />
      <Forecast forecasts={upcomingForecast.day4} city={forecastResponse.city} />
      <Forecast forecasts={upcomingForecast.day5} city={forecastResponse.city} />
    </div>
  );
}

export default ForecastCollection;
