const CurrentWeather = ({ data }) => {
  return (
    <div className="max-w-md mx-auto bg-gradient-to-r from-blue-400 to-indigo-600 shadow-lg rounded-lg p-6 text-white my-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold">{data.city}</p>
          <p className="text-gray-200">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="w-16 h-16"
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        />
      </div>

      <div className="mt-4 text-center">
        <p className="text-5xl font-semibold">{Math.round(data.main.temp)}°C</p>
      </div>

      <div className="mt-4 border-t border-blue-300 pt-4">
        <div className="text-lg font-medium">Details</div>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="flex justify-between">
            <span className="text-gray-300">Feels like:</span>
            <span className="font-medium">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Wind:</span>
            <span className="font-medium">{data.wind.speed} m/s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Humidity:</span>
            <span className="font-medium">{data.main.humidity}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Pressure:</span>
            <span className="font-medium">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
