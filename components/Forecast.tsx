import { useEffect, useState } from "react";
import { IForecast } from "../interfaces/IForecast";
import { ICity, IList } from "../interfaces/IForecastResponse";
import { getValuesFromForecast } from "../lib/helper";

function Forecast({ forecasts, city }: { forecasts: IList[]; city: ICity }) {
  const [forecast, setForecast] = useState<IForecast>();

  useEffect(() => {
    setForecast(getValuesFromForecast(forecasts));
  }, []);

  function capitalizeFirstLetter(string: string | undefined) {
    if (!string) return null;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="bg-slate-900 bg-gradient-to-tl from-gray-800 flex col-span-1 rounded-lg h-28">
      <div className="forecast overflow-auto">
        <p>{forecast?.maxTemperature}°</p>
        <p>{capitalizeFirstLetter(forecast?.weather.description)}</p>
      </div>
    </div>
  );
}

export default Forecast;
