import { useEffect, useState } from "react";
import { ICoord, IForecastResponse, IList } from "../interfaces/IForecastResponse";
import Forecast from "./Forecast";
import { IUpcomingForecasts } from "../interfaces/IUpcomingForecasts";
import ForecastToday from "./ForecastToday";

function ForecastCollection({ forecastResponse }: { forecastResponse: IForecastResponse }) {
  //const [selectedForecast, setSelectedForecast] = useState<string>();

  const groupForecastsByDay = (forecasts: IList[]) => {
    const today = new Date().getDay();

    const upcomingForecastList: IList[][] = [
      forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today),
      forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today + 1),
      forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today + 2),
      forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today + 3),
      forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today + 4),
    ];
    console.log(upcomingForecastList);

    return upcomingForecastList;
  };

  const createForecastComponent = (item: IList[], index: number) => {
    if (index === 0) return <ForecastToday key={index} forecasts={item} city={forecastResponse.city} />;
    return <Forecast key={index} forecasts={item} city={forecastResponse.city} />;
  };

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-3/4 space-x-2 space-y-2">
      {forecastResponse &&
        forecastResponse.list &&
        groupForecastsByDay(forecastResponse.list).map((item, index) => createForecastComponent(item, index))}
    </div>
  );
}

export default ForecastCollection;
