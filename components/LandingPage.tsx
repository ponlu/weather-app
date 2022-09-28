import { useEffect, useState } from "react";
import { countryList } from "../lib/countryList";
import { useForm } from "../hooks/UseForm";
import { ICoord, IForecastResponse } from "../interfaces/IForecastResponse";
import { getCoordinatesByCity, getForecast } from "../lib/client/InternalAPI";
import ForecastCollection from "./ForecastCollection";

const initialFormState: { countryCode: string; city: string } = {
  countryCode: "SE",
  city: "",
};

function LandingPage({ initialForecast }: { initialForecast: IForecastResponse | null }) {
  const [selectedForecast, setSelectedForecast] = useState<IForecastResponse | null>(initialForecast);
  const [invalidInput, setInvalidInput] = useState(false);

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        changeForecast({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []); // Only ask for user location once on load

  const changeLocation = async ({ countryCode, city }: { countryCode: string; city: string }) => {
    const coordinates = await getCoordinatesByCity(countryCode, city);
    if (coordinates) {
      changeForecast(coordinates);
      locationSelectorForm.setFormValues({
        city: "",
        countryCode: locationSelectorForm.values.countryCode,
      });
      setInvalidInput(false);
    } else {
      setInvalidInput(true);
    }
  };

  const changeForecast = async (coordinates: ICoord) => {
    const forecast = await getForecast(coordinates);
    if (forecast && forecast.list && forecast.list.length > 0) {
      setSelectedForecast(forecast);
    }
  };

  const locationSelectorForm = useForm(changeLocation, initialFormState);

  return (
    <div>
      <form onSubmit={locationSelectorForm.onSubmit} className="flex m-2">
        <select
          id="countries"
          name="countryCode"
          defaultValue={locationSelectorForm.values.countryCode}
          onChange={locationSelectorForm.onSelect}
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-1/3 p-2.5 mr-2 hover:cursor-pointer"
        >
          {countryList.map((country, index) => (
            <option key={index} value={country.countryCode}>
              {country.countryName}
            </option>
          ))}
        </select>
        <div className="relative w-2/3">
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="search"
            name="city"
            value={locationSelectorForm.values.city}
            onChange={locationSelectorForm.onChange}
            className={`block p-4 pl-10 w-full text-sm text-white bg-gray-700 rounded-lg border ${
              invalidInput ? "border-red-600" : "border-gray-600"
            } placeholder-gray-400`}
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
      {selectedForecast != null && selectedForecast.list && selectedForecast.list.length > 0 && (
        <ForecastCollection forecastResponse={selectedForecast} />
      )}
    </div>
  );
}

export default LandingPage;
