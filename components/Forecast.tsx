import { ICity, IList } from "../interfaces/IForecastResponse";
import { capitalizeFirstLetter, getImageFromWeather, getValuesFromForecast } from "../lib/helper";

function Forecast({
  forecasts,
  city,
  selected,
  setSelected,
}: {
  forecasts: IList[];
  city: ICity;
  selected: boolean;
  setSelected: () => void;
}) {
  const selectedForecast = getValuesFromForecast(forecasts);

  return (
    <div
      className={`bg-gray-900 bg-gradient-to-tl from-gray-800 col-span-4 rounded-lg  grid grid-cols-2 m-2  duration-500 ${
        selected ? "h-80" : "h-24"
      }`}
      onClick={() => setSelected()}
    >
      <div className="forecast-today flex flex-col items-center place-content-center overflow-hidden">
        {selected && <p>{city.name}</p>}
        <p>{selectedForecast?.day} </p>
        <p>{capitalizeFirstLetter(selectedForecast?.weather.description)}</p>
        <p className={`${selected ? "font-bold" : ""}`}>{selectedForecast?.maxTemperature}°</p>
        {selected && <p>{selectedForecast?.minTemperature}°</p>}
        {selected && <p>Feels like {selectedForecast?.feelsLike}°</p>}
        {selected && <p>Rain {selectedForecast?.rain} mm</p>}
        {selected && <p>Humidity {selectedForecast?.humidity} %</p>}
        {selected && <p>Pressure {selectedForecast?.pressure} hPa</p>}
      </div>
      <div className="flex flex-col items-center place-content-center">
        <img
          src={getImageFromWeather(selectedForecast?.weather.main)}
          alt=""
          className={`duration-500 ${selected ? "w-40 h-40" : "w-10 h-10"}`}
        />
      </div>
    </div>
  );
}

export default Forecast;
