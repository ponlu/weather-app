import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { ICity, ICoord, IForecastResponse, IList } from "../interfaces/IForecastResponse";
import { getForecast } from "../lib/server/OpenWeatherAPI";

function ForecastToday({ forecasts, city }: { forecasts: IList[]; city: ICity }) {
  const [forecast, setForecast] = useState<IForecast>();
  const getValuesFromForecast = () => {
    const tempMaxList = forecasts.map((forecast) => forecast.main.temp_max);
    const tempMax = Math.max(...tempMaxList);

    const tempMinList = forecasts.map((forecast) => forecast.main.temp_min);
    const tempMin = Math.min(...tempMinList);

    const feelsLikeList = forecasts.map((forecast) => forecast.main.feels_like);
    const feelsLike = Math.min(...feelsLikeList);

    const humidityList = forecasts.map((forecast) => forecast.main.humidity);
    const humidity = Math.min(...humidityList);

    const pressureList = forecasts.map((forecast) => forecast.main.pressure);
    const pressure = Math.min(...pressureList);

    const rain = forecasts.map((forecast) => (forecast.rain ? forecast.rain?.["3h"] : 0)).reduce((a, b) => a + b);

    const forecast: IForecast = {
      maxTemperature: tempMax,
      minTemperature: tempMin,
      feelsLike: feelsLike,
      rain: rain,
      humidity: humidity,
      pressure: pressure,
    };
    return forecast;
  };

  return (
    <div className="bg-green-500 flex outline col-span-4 w-3/4 rounded-lg">
      <p>{forecasts[0].dt_txt.toString()}</p>
      <p>{forecasts[0].dt_txt.toString()}</p>
      <p>{forecasts[0].dt_txt.toString()}</p>
      <p>{forecasts[0].dt_txt.toString()}</p>
      <p>{forecasts[0].dt_txt.toString()}</p>
      <p>{forecasts[0].dt_txt.toString()}</p>
      <p>{forecasts[0].dt_txt.toString()}</p>
      <p>{forecasts[0].dt_txt.toString()}</p>
    </div>
  );
}

export default ForecastToday;

interface IForecast {
  maxTemperature: number;
  minTemperature: number;
  feelsLike: number;
  rain: number;
  humidity: number;
  pressure: number;
  // wind: string;
  // weather: string;
}
