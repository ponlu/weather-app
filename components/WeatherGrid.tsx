import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { ICoord } from "../interfaces/IForecastResponse";
import { getCoordinatesByZip, getCoordinatesCity, getForecast } from "../lib/OpenWeatherAPI";

function WeatherGrid() {
  const stockholmCoord: ICoord = { lat: 59.33, lon: 18.06 };
  const [coordinates, setCoordinates] = useState<ICoord>(stockholmCoord); // Default to Stockholm

  //   useEffect(() => {
  // //     Load initial weather forecast
  //   }, [coordinates]);

  const handleGetForecastOnClick = async () => {
    const data = await getForecast(coordinates);
    console.log(data);
  };

  const handleGetCoordinatesByZipOnClick = async () => {
    const data = await getCoordinatesByZip("SE", "17266");
    console.log(data);
  };

  const handleGetCoordinatesByCityOnClick = async () => {
    const data = await getCoordinatesCity("Mariefred");
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
      <button
        onClick={handleGetCoordinatesByZipOnClick}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Get coordinates by zip
      </button>
      <button
        onClick={handleGetCoordinatesByCityOnClick}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Get coordinates by city
      </button>
    </div>
  );
}

export default WeatherGrid;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const query = context.query;
//   return {
//     props: { query },
//   };
// };
