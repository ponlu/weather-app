import { useEffect, useState } from "react";
import { countryList } from "../lib/countryList";
import { useForm } from "../hooks/UseForm";
import { ICountry } from "../interfaces/ICountry";
import { ICoord } from "../interfaces/IForecastResponse";
import { getCoordinatesByZip, getCoordinatesByCity, getForecast } from "../lib/client/InternalAPI";

function WeatherGrid() {
  const stockholmCoord: ICoord = { lat: 59.33, lon: 18.06 };
  const sweden: ICountry = { countryName: "Sweden", countryCode: "SE" };
  const [coordinates, setCoordinates] = useState<ICoord>(stockholmCoord); // Default to Stockholm

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []);

  const initialState: { countryCode: string; zip: string; city: string } = {
    countryCode: "SE",
    zip: "11120",
    city: "Stockholm",
  };

  const changeLocation = async (country: ICountry, zip: string, city: string) => {
    // User values to find coordinates and change location using them
  };

  const locationSelectorForm = useForm(changeLocation, initialState);

  const handleGetForecastOnClick = async () => {
    console.log(coordinates);
    const data = await getForecast(coordinates);
    console.log(data);
  };

  const handleGetCoordinatesByZipOnClick = async () => {
    const coords = await getCoordinatesByZip(locationSelectorForm.values.countryCode, locationSelectorForm.values.zip);
    console.log(coords);
    if (coords) {
      setCoordinates(coords);
    } else {
      console.log("No coordinates found");
    }
  };

  const handleGetCoordinatesByCityOnClick = async () => {
    const coords = await getCoordinatesByCity(
      locationSelectorForm.values.countryCode,
      locationSelectorForm.values.city
    );
    console.log(coords);
    if (coords) {
      setCoordinates(coords);
    } else {
      console.log("No coordinates found");
    }
  };

  return (
    <div className="flex place-items-center ">
      <form>
        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
          Your Email
        </label>
        <div className="relative">
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
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

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

      <form onSubmit={locationSelectorForm.onSubmit}>
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
          Select your country
        </label>

        <select
          id="countries"
          name="countryCode"
          defaultValue={locationSelectorForm.values.countryCode}
          onChange={locationSelectorForm.onSelect}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {countryList.map((country, index) => (
            <option key={index} value={country.countryCode}>
              {country.countryName}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default WeatherGrid;
