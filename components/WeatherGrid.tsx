import { useEffect, useState } from "react";
import { countryList } from "../helpers/countryList";
import { useForm } from "../hooks/UseForm";
import { ICountry } from "../interfaces/ICountry";
import { ICoord } from "../interfaces/IForecastResponse";
import { getCoordinatesByZip, getCoordinatesByCity, getForecast } from "../lib/client/InternalAPI";

function WeatherGrid() {
  const stockholmCoord: ICoord = { lat: 59.33, lon: 18.06 };
  const sweden: ICountry = { countryName: "Sweden", countryCode: "SE" };
  const [coordinates, setCoordinates] = useState<ICoord>(stockholmCoord); // Default to Stockholm

  useEffect(() => {
    //     Load initial weather forecast
    //     Polulate initialState with data from GeoLocator
    //     If user doesn't allow location tracking, use default stockholm, sweden
    //     locationSelectorForm.setFormValues( DETTA VÄRDE SKA KOMMA FRÅN GEOLOCATOR );
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
      // locationSelectorForm.values.city
      "Mariefred"
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
