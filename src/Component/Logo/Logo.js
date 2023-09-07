import React from "react";
import { Tilt } from "react-tilt";
import "./Logo.css";
import brain from "./icons8-artificial-intelligence-96.png";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Title br2 shadow-2"
        options={{ max: 25 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Titl-inner pa3">
          <img
            src={brain}
            alt="Your GIF"
            style={{ paddingTop: "5px", width: 100, height: 100 }}
          />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
