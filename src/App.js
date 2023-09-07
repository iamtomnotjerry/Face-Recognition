import React, { useState } from "react";
import "./App.css";
import Navigation from "./Component/Navigation/Navigation";
import Logo from "./Component/Logo/Logo";
import ImageLinkForm from "./Component/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./Component/FaceRecognition/FaceRecognition";
import Register from "./Component/Register/Register";
import Signin from "./Component/Signin/Signin";
import Rank from "./Component/Rank/Rank";
import ParticlesBg from "particles-bg";


    const returnClarifaiRequestOption = (imageUrl) => {
      const PAT = "3133f530b1e04ee9a1c1a9f5f23bc19d";

      const USER_ID = "zp73eec0r27l";
      const APP_ID = "test";

      const MODEL_ID = "general-image-recognition";
      const MODEL_VERSION_ID = "aa7f35c01e0642fda5cf400f543e7c40";
      const IMAGE_URL = imageUrl;
      const raw = JSON.stringify({
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [
          {
            data: {
              image: {
                url: IMAGE_URL,
              },
            },
          },
        ],
      });
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Key " + PAT,
        },
        body: raw,
      };
      return requestOptions;
    }
    

    
function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box,setBox] = useState({});
  const [route, setRoute] = useState('signin')
  const [isSignIn,setSignIn] = useState(false)

  const calculateFaceLocation = (data) =>{
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }
  }
  const displayFaceBox = (box) =>{
    console.log(box)
    setBox(box)
  }
  const onInputChange = (event) => {
    setInput(event.target.value);
    console.log(event.target.value); // Log the current input value
  }

  const onButtonSubmit = () => {
    setImageUrl(input); // Update 'imageUrl' immediately
    console.log(input); // Log the current 'input' value
    // You can now use 'imageUrl' to make your Clarifai API call here.
    fetch(
      "https://api.clarifai.com/v2/models/" +
        "face-detection" +
        "/versions/" +
        "6dc7e46bc9124c5c8824be4822abe105" +
        "/outputs",
      returnClarifaiRequestOption(input)
    )
      .then((response) => response.json())
      //
      .then((result) =>
        // console.log(result.outputs[0].data.regions[0].region_info.bounding_box)
        displayFaceBox(calculateFaceLocation(result))
      )
      .catch((error) => console.log("error", error));
  }
  const onRouteChange = (route) => {
    if (route === 'signout'){
      setSignIn(false)
    } else if (route === 'home') {
      setSignIn(true)
    }
    setRoute(route)
  }
  return (
    <div className="App">
      <Navigation isSignIn={isSignIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
      <ParticlesBg color="black" num={10} type="polygon" bg={true} />
    </div>
  );
}

export default App;
