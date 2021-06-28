import React from "react";

const WeatherInfo = ({ weather }) => {
  // const nhietdo = weather ? weather.main.temp - 273.15 : "";
  const tempCelcius = weather ? (weather.main.temp - 273.15).toFixed(2) : "";
  // console.log("tessssst weather");
  // console.log(weather);
  // Nen: tao 1 bien tempCelcius de gan cai weather.main.temp, khi goi thi goi bien nay
  // Ko nen: goi truc tiep weather.main.temp vi weather render cham hon minh goi. phai co dau ?
  // vi du : weather?.main.temp
  return (
    <div className="weather-infor">
      <h5 className="fw-bold cityName">{weather?.name}</h5>
      <h1 className="fw-bold temp">
        {tempCelcius} &deg;C / {weather?.main.temp} &deg;F
      </h1>
      <h2 className="cloud">{weather?.weather[0]?.description}</h2>
    </div>
  );
};

export default WeatherInfo;
