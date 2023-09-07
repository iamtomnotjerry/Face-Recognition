import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
  return (
    <div>
      <p className="f3">
        {"This Magic Brain will detect faces in your pictures. Git it a try!"}
      </p>
      <div className="center">
        <div className="form pa4 br3 shadow-5 center">
          <input
            placeholder="Give me the URL link .ing picture"
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
      <p className="f3">
        {"Example: https://c.stocksy.com/a/LXL500/z9/1274431.jpg"}
      </p>
    </div>
  );
};

export default ImageLinkForm;
