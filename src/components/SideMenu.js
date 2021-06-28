import React from "react";
import { Nav } from "react-bootstrap";

const SideMenu = ({ selectedCity, cities, handleCityChange }) => {
  // dau tien dung fronend
  // khoi tao la current, la url tai vi tri hien tai. cu the la HCM
  // Khi click vao 1 thanh pho, se chay 1 ham set lai gia tri selectedCity thong qua
  //setSelectedCity.
  // Ham nay set o Current va tung thanh pho. Tai current la set gia tri current, vi vay
  // onClick(1 ham ES6 tra ve gia tri la 1 ham da viet o App.js)
  return (
    <div>
      <Nav className="flex-column test">
        <Nav.Link
          className={!selectedCity ? "active" : ""}
          onClick={() => handleCityChange("current")}
        >
          Current City
        </Nav.Link>
        <hr />
        {/* vi co nhieu city o trong cities, nen chung ta muon in ra 1 list
        danh sach City, phai dung cities.map(). In ra tat ca cac phan tu voi name dai dien */}

        {cities.map((city) => (
          <Nav.Link
            className={
              selectedCity && selectedCity.id === city.id ? "active" : ""
            }
            key={city.id}
            onClick={() => handleCityChange(city)}
          >
            {city.name}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default SideMenu;
