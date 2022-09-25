import { useEffect, useState } from "react";
import { ICoord, IForecastResponse, IList } from "../interfaces/IForecastResponse";
import Forecast from "./Forecast";
import { IUpcomingForecasts } from "../interfaces/IUpcomingForecasts";

function ForecastCollection({ forecastResponse }: { forecastResponse: IForecastResponse }) {
  const [selectedForecast, setSelectedForecast] = useState<IForecastResponse>();

  const groupForecastsByDay = (forecasts: IList[]) => {
    const today = new Date().getDay();

    const upcomingForecasts: IUpcomingForecasts = {
      day1: forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today),
      day2: forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today + 1),
      day3: forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today + 2),
      day4: forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today + 3),
      day5: forecasts.filter((forecast) => new Date(forecast.dt_txt).getDay() === today + 4),
    };
    console.log(upcomingForecasts);
    return upcomingForecasts;
  };

  const handleGetForecastOnClick = async () => {
    groupForecastsByDay(forecastResponse.list);
  };

  return (
    <div className="flex place-items-center ">
      <button
        onClick={handleGetForecastOnClick}
        className="bg-white m-2 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        GROUP BY DAY
      </button>

      <Forecast forecasts={groupForecastsByDay(forecastResponse.list).day1} />
    </div>
  );
}

export default ForecastCollection;

interface IForecast {
  maxTemperature: number;
  minTemperature: number;
  wind: string;
  clouds: string;
}
