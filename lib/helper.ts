import { IForecast } from "../interfaces/IForecast";
import { IList, IMainEnum, IWeather } from "../interfaces/IForecastResponse";

export const getValuesFromForecast = (forecasts: IList[]) => {
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

  let weather = forecasts.find((forecast) => new Date(forecast.dt_txt).getHours() === 15)?.weather[0];
  if (!weather) {
    weather = forecasts[0].weather[0];
  }

  const day = dateToWeekDay(new Date(forecasts[0].dt_txt));

  const forecast: IForecast = {
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
  return "/images/Clear.png";
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
