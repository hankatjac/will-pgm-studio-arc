import { useState, useEffect } from "react";
import Search from "./search/Search";
import CurrentWeather from "./currentWeather/CurrentWeather";
import Forecast from "./forecast/Forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import axios from "axios";

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  // const fetchWeatherData = async (searchData) => {
  //   const [lat, lon] = searchData.value.split(" ");

  //   const currentWeatherFetch = fetch(
  //     `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  //   );
  //   const forecastFetch = fetch(
  //     `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  //   );

  //   try {
  //     const [weatherResponse, forecastResponse] = await Promise.all([
  //       currentWeatherFetch,
  //       forecastFetch,
  //     ]);

  //     const weatherData = await weatherResponse.json();
  //     const forecastData = await forecastResponse.json();

  //     setCurrentWeather({ city: searchData.label, ...weatherData });
  //     setForecast({ city: searchData.label, ...forecastData });
  //   } catch (error) {
  //     console.error("Error fetching weather data:", error);
  //   }
  // };

  const fetchWeatherData = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(
          `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
          { withCredentials: false }
        ),
        axios.get(
          `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
          { withCredentials: false }
        ),
      ]);

      const weatherData = weatherResponse.data;
      const forecastData = forecastResponse.data;

      setCurrentWeather({ city: searchData.label, ...weatherData });
      setForecast({ city: searchData.label, ...forecastData });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };


  useEffect(() => {
    // Default search data for Montreal
    const defaultSearchData = {
      value: "45.5017 -73.5673", // Latitude and longitude for Montreal
      label: "Montreal, CA",
    };

    fetchWeatherData(defaultSearchData);
  }, []);



  // axios.get(url, { validateStatus: () => true })

  return (
    <div className="container mx-auto py-5">
      <div className="w-full md:w-1/2 mx-auto">
        <Search fetchWeatherData={fetchWeatherData} />
      </div>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
};

export default Weather;
