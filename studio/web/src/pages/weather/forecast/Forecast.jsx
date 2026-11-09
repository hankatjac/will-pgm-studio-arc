import React, { useState } from "react";
// import "./forecast.css";

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Forecast = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek).concat(WEEK_DAYS.slice(0, dayInAWeek));

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h2 className="text-xl font-bold text-center mb-4">Daily Forecast</h2>
      <div className="space-y-2">
        {data.list.slice(0, 7).map((item, idx) => (
          <div key={idx} className="border border-gray-200 rounded-md overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-300 hover:bg-gray-200 focus:outline-none"
              onClick={() => toggleAccordion(idx)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  className="w-10 h-10"
                  alt="weather"
                />
                <span className="text-lg font-medium">{forecastDays[idx]}</span>
                <span className="text-gray-600">{item.weather[0].description}</span>
                <label className="text-gray-800">{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</label>
              </div>
              <span>{openIndex === idx ? "▲" : "▼"}</span>
            </button>
            {openIndex === idx && (
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <strong>Pressure:</strong> {item.main.pressure} hPa
                  </div>
                  <div>
                    <strong>Humidity:</strong> {item.main.humidity}%
                  </div>
                  <div>
                    <strong>Clouds:</strong> {item.clouds.all}%
                  </div>
                  <div>
                    <strong>Wind Speed:</strong> {item.wind.speed} m/s
                  </div>
                  <div>
                    <strong>Sea Level:</strong> {item.main.sea_level} m
                  </div>
                  <div>
                    <strong>Feels Like:</strong> {item.main.feels_like}°C
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;