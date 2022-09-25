import Image from "next/image";
import { useEffect, useState } from "react";
import { IForecast } from "../interfaces/IForecast";
import { ICity, IList, IMainEnum } from "../interfaces/IForecastResponse";
import { getValuesFromForecast } from "../lib/helper";

function ForecastToday({ forecasts, city }: { forecasts: IList[]; city: ICity }) {
  const [forecast, setForecast] = useState<IForecast>();

  useEffect(() => {
    setForecast(getValuesFromForecast(forecasts));
  }, []);

  function capitalizeFirstLetter(string: string | undefined) {
    if (!string) return null;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getImageFromWeather(weather: string | undefined) {
    if (weather === IMainEnum.Clear) return "/images/Clear.png";
    if (weather === IMainEnum.Clouds) return "/images/Clouds.png";
    if (weather === IMainEnum.Rain) return "/images/Rain.png";
    return "";
  }

  return (
    <div className="bg-slate-900 bg-gradient-to-tl from-gray-800 col-span-4 rounded-lg h-80 grid grid-cols-2">
      <div className="forecast-today flex flex-col items-center place-content-center">
        <div>
          <h1 className="text-white">{city.name}</h1>
          <p className="font-bold">{forecast?.maxTemperature}°</p>
          <p>{forecast?.minTemperature}°</p>
          <p>Feels like {forecast?.feelsLike}°</p>
          <p>Rain {forecast?.rain} mm</p>
          <p>Humidity {forecast?.humidity} %</p>
          <p>Pressure {forecast?.pressure} hPa</p>
          <p>{capitalizeFirstLetter(forecast?.weather.description)} </p>
        </div>
      </div>
      <div className="flex flex-col items-center place-content-center">
        <Image src={getImageFromWeather(forecast?.weather.main)} alt="" width={200} height={200} layout={"fixed"} />
      </div>
    </div>
  );
}

export default ForecastToday;
