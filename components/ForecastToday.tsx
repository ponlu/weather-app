import { useEffect, useState } from "react";
import { IForecast } from "../interfaces/IForecast";
import { ICity, IList } from "../interfaces/IForecastResponse";
import { capitalizeFirstLetter, getImageFromWeather, getValuesFromForecast } from "../lib/helper";

function ForecastToday({ forecasts, city, selected }: { forecasts: IList[]; city: ICity; selected: boolean }) {
  const [forecast, setForecast] = useState<IForecast>();
  const [isSelected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    setForecast(getValuesFromForecast(forecasts));
  }, [forecasts]);

  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  return (
    <div
      className={`bg-gray-900 bg-gradient-to-tl from-gray-800 col-span-4 rounded-lg  grid grid-cols-2 m-2  duration-500 ${
        isSelected ? "h-80" : "h-24"
      }`}
    >
      <div className="forecast-today flex flex-col items-center place-content-center overflow-hidden">
        {/* <div>
          <h1 className="text-white">{city.name}</h1>
          <p>{forecast?.day} </p>
          <p>{capitalizeFirstLetter(forecast?.weather.description)} </p>
          <p className="font-bold">{forecast?.maxTemperature}°</p>
          <p>{forecast?.minTemperature}°</p>
          <p>Feels like {forecast?.feelsLike}°</p>
          <p>Rain {forecast?.rain} mm</p>
          <p>Humidity {forecast?.humidity} %</p>
          <p>Pressure {forecast?.pressure} hPa</p>
        </div> */}
        {isSelected && <p>{city.name}</p>}
        <p>{forecast?.day} </p>
        <p>{capitalizeFirstLetter(forecast?.weather.description)}</p>
        <p className={`${isSelected ? "font-bold" : ""}`}>{forecast?.maxTemperature}°</p>
        {isSelected && <p>{forecast?.minTemperature}°</p>}
        {isSelected && <p>Feels like {forecast?.feelsLike}°</p>}
        {isSelected && <p>Rain {forecast?.rain} mm</p>}
        {isSelected && <p>Humidity {forecast?.humidity} %</p>}
        {isSelected && <p>Pressure {forecast?.pressure} hPa</p>}
      </div>
      <div className="flex flex-col items-center place-content-center">
        <img
          src={getImageFromWeather(forecast?.weather.main)}
          alt=""
          className={`duration-500 ${isSelected ? "w-40 h-40" : "w-10 h-10"}`}
        />
      </div>
    </div>
  );
}

export default ForecastToday;
