import { IForecast } from "../interfaces/IForecast";
import { IList, IWeather } from "../interfaces/IForecastResponse";

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

  const rain = forecasts.map((forecast) => (forecast.rain ? forecast.rain?.["3h"] : 0)).reduce((a, b) => a + b);

  let weather = forecasts.find((forecast) => new Date(forecast.dt_txt).getHours() === 15)?.weather[0];
  if (!weather) {
    weather = forecasts[0].weather[0];
  }

  const forecast: IForecast = {
    maxTemperature: tempMax,
    minTemperature: tempMin,
    feelsLike: feelsLike,
    rain: rain,
    humidity: humidity,
    pressure: pressure,
    wind: wind,
    weather: weather as IWeather,
  };
  return forecast;
};
