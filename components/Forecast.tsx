import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { ICoord, IForecastResponse } from "../interfaces/IForecastResponse";
import { getForecast } from "../lib/server/OpenWeatherAPI";

function Forecast() {
  const stockholmCoord: ICoord = { lat: 59.33, lon: 18.06 };
  const [coordinates, setCoordinates] = useState<ICoord>(stockholmCoord); // Default to Stockholm
  const [selectedForecast, setSelectedForecast] = useState<IForecastResponse>();

  //   useEffect(() => {}, []);
  const handleGetForecastOnClick = async () => {
    const data = await getForecast(coordinates);
    console.log(data);
  };

  return (
    <div className="flex place-items-center ">
      <button
        onClick={handleGetForecastOnClick}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Get weather forecast
      </button>
    </div>
  );
}

export default Forecast;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const query = context.query;
//   return {
//     props: { query },
//   };
// };
