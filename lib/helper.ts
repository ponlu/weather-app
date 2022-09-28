import { IForecastDisplay } from "../interfaces/IForecast";
import { IForecast, IMainEnum, IWeather } from "../interfaces/IForecastResponse";

// Takes in a list of forecasts, representing a days worth of forecasts and extracts the relevant values
export const getValuesFromForecastList = (forecasts: IForecast[]) => {
  const tempMaxList = forecasts.map((forecast) => Math.round(forecast.main.temp_max));
  const tempMax = Math.max(...tempMaxList);

  const tempMinList = forecasts.map((forecast) => Math.round(forecast.main.temp_min));
  const tempMin = Math.min(...tempMinList);

  const feelsLikeList = forecasts.map((forecast) => Math.round(forecast.main.feels_like));
  const feelsLike = Math.max(...feelsLikeList);

  const humidityList = forecasts.map((forecast) => forecast.main.humidity);
  const humidity = Math.max(...humidityList);

  const pressureList = forecasts.map((forecast) => forecast.main.pressure);
  const pressure = Math.max(...pressureList);

  const windList = forecasts.map((forecast) => forecast.wind.speed);
  const wind = Math.max(...windList);

  const rain = +forecasts
    .map((forecast) => (forecast.rain ? forecast.rain?.["3h"] : 0))
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  // Default to weather at 15
  let weather = forecasts.find((forecast) => formatDate(forecast.dt_txt).getHours() === 15)?.weather[0];
  if (!weather) {
    // If 15 can't be found it means the time is past 15 so the closest time is used
    weather = forecasts[0].weather[0];
  }

  const day = dateToWeekDay(formatDate(forecasts[0].dt_txt));

  const forecast: IForecastDisplay = {
    maxTemperature: tempMax,
    minTemperature: tempMin,
    feelsLike: feelsLike,
    rain: rain,
    humidity: humidity,
    pressure: pressure,
    wind: wind,
    weather: weather as IWeather,
    day: day,
  };
  return forecast;
};

export const capitalizeFirstLetter = (string: string | undefined) => {
  if (!string) return null;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getImageFromWeather = (weather: string | undefined) => {
  if (weather === IMainEnum.Clear) return "/images/Clear.png";
  if (weather === IMainEnum.Clouds) return "/images/Clouds.png";
  if (weather === IMainEnum.Rain) return "/images/Rain.png";
  if (weather === IMainEnum.Snow) return "/images/Snow.png";
  return "/images/Clear.png"; // Default to clear. The API documentation doesn't specify every possible weather type
};

const dateToWeekDay = (date: Date) => {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekday[date.getDay()];
};

export const addDays = (date: Date, days: number) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

// This is needed for IOS devices to be able to read the date
export const formatDate = (dateString: string) => {
  const arr = dateString.split(/[- :]/).map((value) => Number(value));
  return new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
};
