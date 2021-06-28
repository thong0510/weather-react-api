import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PublicNavbar from "./components/PublicNavbar";
import { Container, Row, Col } from "react-bootstrap";
import SideMenu from "./components/SideMenu";
import WeatherInfo from "./components/WeatherInfo";
import "./App.css";

/*
  - Len trang dky API va xem cac API documentation
  - Nhan thay: can location( lat, lon) nen phai len google tim ham geoLocation()
  - geoLocation gom cap (lat, lon) se thay doi => state va dung useState
  - Ham geoLocation() dat trong useEffect de quan ly vong doi 1 state
  - Viet ham getUrl() return ra url neu ton tai lat, long. ko thi return ""
  - fetch API thong qua url
  - Trang chu gom 1 hang, 2 cot. Cot trai la Sidemenu, gom Current Location, va cac tp
  - Cot phai: thong tin weather
  - Viet cac component sidemenu, weatherinfo
  1. cot phai:
  - truyen weather tu data fetchAPI qua lam props cho weatherinfo. xu ly
  2. Cot trai
  - Trong App.js viet 1 arr gom cac object la cac thanh pho
  - Nhan thay co state: selectedCity thay doi khi minh chon tp nay hay tp khac
  - Viet ham handleChangeCity de khi minh click vao phan tu nao, no se set lai selectedCity
  - Truyen cities( la arr), selectedCity, handleChangeCity qua components cot trai
  - hien thi: dung cities.map()
  - Trong App.js thi khi click vao city nao, thay doi url. dung if(selectedcity)

*/

const API_KEY = "67c9bfdc66c0c9e6c9411e70b4ddb57e";

const cities = [
  {
    id: 1566083,
    name: "Ho Chi Minh City",
    country: "VN",
    latitude: 10.817141,
    longitude: 106.707954,
  },
  {
    id: 2994540,
    name: "Paris",
    country: "FR",
    latitude: 48.856613,
    longitude: 2.352222,
  },
  {
    id: 5039192,
    name: "New York",
    country: "US",
    latitude: 40.712776,
    longitude: -74.005974,
  },
  {
    id: 4164138,
    name: "Miami",
    country: "US",
    latitude: 25.761681,
    longitude: -80.191788,
  },
  {
    id: 5391959,
    name: "San Francisco",
    country: "US",
    latitude: 37.774929,
    longitude: -122.419418,
  },
  {
    id: 524894,
    name: "Moscow",
    country: "RU",
    latitude: 55.755825,
    longitude: 37.617298,
  },
  {
    id: 1850144,
    name: "Tokyo",
    country: "JP",
    latitude: 35.689487,
    longitude: 139.691711,
  },
  {
    id: 6090785,
    name: "Vancouver",
    country: "CA",
    latitude: 49.28273,
    longitude: -123.120735,
  },
];

const App = () => {
  const [geoLocation, setGeoLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  const [weather, setWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const url = getUrl();

  function getUrl() {
    if (selectedCity) {
      return `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.latitude}&lon=${selectedCity.longitude}&appid=${API_KEY}`;
    }
    if (geoLocation.latitude && geoLocation.longitude) {
      return `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.latitude}&lon=${geoLocation.longitude}&appid=${API_KEY}`;
    }
    return "";
  }

  // console.log("Start GeoLocation");

  useEffect(() => {
    console.log("UserEffect run");
    const success = (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setGeoLocation({
        latitude: lat,
        longitude: lon,
        error: null,
      });
    };

    const error = (position) => {
      setGeoLocation({
        latitude: null,
        longitude: null,
        error: error,
      });
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (!url) return;
    try {
      const fetchData = async () => {
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data);
        setWeather(data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  const handleCityChange = (city) => {
    if (city === "current") {
      setSelectedCity(null);
    } else {
      setSelectedCity(city);
    }
  };

  return (
    <>
      <PublicNavbar />
      <Container>
        <Row>
          <Col md={3} className="d-none d-md-block">
            <SideMenu
              selectedCity={selectedCity}
              handleCityChange={handleCityChange}
              cities={cities}
            />
          </Col>

          <Col md={9}>
            <WeatherInfo weather={weather} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
