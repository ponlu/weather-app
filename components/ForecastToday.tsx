import Image from "next/image";
import { useEffect, useState } from "react";
import { IForecast } from "../interfaces/IForecast";
import { ICity, IList } from "../interfaces/IForecastResponse";
import { capitalizeFirstLetter, getImageFromWeather, getValuesFromForecast } from "../lib/helper";

function ForecastToday({ forecasts, city }: { forecasts: IList[]; city: ICity }) {
  const [forecast, setForecast] = useState<IForecast>();

  useEffect(() => {
    setForecast(getValuesFromForecast(forecasts));
  }, []);

  return (
    <div className="bg-gray-900 bg-gradient-to-tl from-gray-800 col-span-4 rounded-lg h-80 grid grid-cols-2 m-2">
      <div className="forecast-today flex flex-col items-center place-content-center">
        <div>
          <h1 className="text-white">{city.name}</h1>
          <p>{forecast?.day} </p>
          <p>{capitalizeFirstLetter(forecast?.weather.description)} </p>
          <p className="font-bold">{forecast?.maxTemperature}°</p>
          <p>{forecast?.minTemperature}°</p>
          <p>Feels like {forecast?.feelsLike}°</p>
          <p>Rain {forecast?.rain} mm</p>
          <p>Humidity {forecast?.humidity} %</p>
          <p>Pressure {forecast?.pressure} hPa</p>
        </div>
      </div>
      <div className="flex flex-col items-center place-content-center">
        <Image src={getImageFromWeather(forecast?.weather.main)} alt="" width={200} height={200} layout={"fixed"} />
      </div>
    </div>
  );
}

export default ForecastToday;
