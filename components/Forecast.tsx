import Image from "next/image";
import { useEffect, useState } from "react";
import { IForecast } from "../interfaces/IForecast";
import { ICity, IList } from "../interfaces/IForecastResponse";
import { capitalizeFirstLetter, getImageFromWeather, getValuesFromForecast } from "../lib/helper";

function Forecast({ forecasts }: { forecasts: IList[] }) {
  const [forecast, setForecast] = useState<IForecast>();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setForecast(getValuesFromForecast(forecasts));
  }, [forecasts]);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      className="bg-gray-900 bg-gradient-to-tl from-gray-800 flex col-span-1 rounded-lg h-40 duration-500 hover:overflow-hidden hover:h-68 m-2"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="forecast w-full">
        <div className="flex flex-col items-center place-content-center">
          <Image src={getImageFromWeather(forecast?.weather.main)} alt="" width={40} height={40} layout={"fixed"} />
        </div>
        <p>{forecast?.day} </p>
        <p>{capitalizeFirstLetter(forecast?.weather.description)}</p>
        <p className={`${isHovering ? "font-bold" : ""}`}>{forecast?.maxTemperature}°</p>
        {isHovering && <p>{forecast?.minTemperature}°</p>}
        {isHovering && <p>Feels like {forecast?.feelsLike}°</p>}
        {isHovering && <p>Rain {forecast?.rain} mm</p>}
        {isHovering && <p>Humidity {forecast?.humidity} %</p>}
        {isHovering && <p>Pressure {forecast?.pressure} hPa</p>}
      </div>
    </div>
  );
}

export default Forecast;
