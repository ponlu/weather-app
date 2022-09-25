import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { ICity, ICoord, IForecastResponse, IList } from "../interfaces/IForecastResponse";
import { getForecast } from "../lib/server/OpenWeatherAPI";

function Forecast({ forecasts, city }: { forecasts: IList[]; city: ICity }) {
  const stockholmCoord: ICoord = { lat: 59.33, lon: 18.06 };
  const [coordinates, setCoordinates] = useState<ICoord>(stockholmCoord); // Default to Stockholm
  const [selectedForecast, setSelectedForecast] = useState<IForecastResponse>();

  return (
    <div className="bg-orange-500 flex outline rounded-lg">
      <p>{forecasts[0].dt_txt.toString()}</p>
    </div>
  );
}

export default Forecast;
