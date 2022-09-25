import { useEffect, useMemo, useState } from "react";
import { countryList } from "../lib/countryList";
import { useForm } from "../hooks/UseForm";
import { ICountry } from "../interfaces/ICountry";
import { ICoord, IForecastResponse } from "../interfaces/IForecastResponse";
import { getCoordinatesByCity, getForecast } from "../lib/client/InternalAPI";
import ForecastCollection from "./ForecastCollection";

function WeatherGrid() {
  const stockholmCoord: ICoord = { lat: 59.33, lon: 18.06 };
  const [selectedCoordinates, setSelectedCoordinates] = useState<ICoord>(stockholmCoord); // Default to Stockholm
  const [selectedForecast, setSelectedForecast] = useState<IForecastResponse>();

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setSelectedCoordinates({
  //         lat: position.coords.latitude,
  //         lon: position.coords.longitude,
  //       });
  //       // getForecast(selectedCoordinates);
  //     });
  //   } else {
  //     // getForecast(selectedCoordinates);
  //   }
  // }, []);

  useEffect(() => {
    console.log("GETFORCAST!!");
    getForecast(selectedCoordinates).then((forecast) => {
      if (forecast) setSelectedForecast(forecast);
    });
  }, []);

  const initialState: { countryCode: string; zip: string; city: string } = {
    countryCode: "SE",
    zip: "11120",
    city: "Stockholm",
  };

  const changeLocation = async (country: ICountry, zip: string, city: string) => {
    console.log(locationSelectorForm.values);
    // User values to find coordinates and change location using them
  };

  const locationSelectorForm = useForm(changeLocation, initialState);

  return (
    <div className="m-2">
      <form onSubmit={locationSelectorForm.onSubmit} className="flex m-2">
        <select
          id="countries"
          name="countryCode"
          defaultValue={locationSelectorForm.values.countryCode}
          onChange={locationSelectorForm.onSelect}
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-40 p-2.5 mr-2 hover:cursor-pointer"
        >
          {countryList.map((country, index) => (
            <option key={index} value={country.countryCode}>
              {country.countryName}
            </option>
          ))}
        </select>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="search"
            name="city"
            onChange={locationSelectorForm.onChange}
            className="block p-4 pl-10 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 placeholder-gray-400"
            placeholder="City"
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-slate-800 hover:bg-slate-900 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
      {selectedForecast && <ForecastCollection forecastResponse={selectedForecast} />}
    </div>
  );
}

export default WeatherGrid;
