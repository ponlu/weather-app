import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { ICoord, IForecastResponse, IList } from "../interfaces/IForecastResponse";
import { getForecast } from "../lib/server/OpenWeatherAPI";

function Forecast({ forecasts }: { forecasts: IList[] }) {
  const stockholmCoord: ICoord = { lat: 59.33, lon: 18.06 };
  const [coordinates, setCoordinates] = useState<ICoord>(stockholmCoord); // Default to Stockholm
  const [selectedForecast, setSelectedForecast] = useState<IForecastResponse>();

  return <div className="flex place-items-center "></div>;
}

export default Forecast;
