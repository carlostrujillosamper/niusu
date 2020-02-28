import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import './App.css';

function App() {
  const [viewport, setViewport] = useState({
    latitude: 52.520008,
    longitude: 13.404954,
    width: "100vw",
    height: "100vh",
    zoom: 3
  });
  return (
    <div>
    <ReactMapGL
    {...viewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    mapStyle="mapbox://styles/carlosdeveloper/ck6w7g85318d21iqrcpx2pt5s"
  />
  <div className='leyenda'>
    Leyenda con varios paises y opciones
  </div>
  </div>
  );
}

export default App;
