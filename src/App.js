import React, { useState, useEffect } from 'react';
import TrafficLight from './components/TrafficLight';
import { service } from './state-machines/LightMachine';
import './App.css';

// Constants to use when changing the light
const RED_LIGHT = {
  RedOn: true,
  YellowOn: false,
  GreenOn: false,
}

const YELLOW_LIGHT = {
  RedOn: false,
  YellowOn: true,
  GreenOn: false,
}

const GREEN_LIGHT = {
  RedOn: false,
  YellowOn: false,
  GreenOn: true,
}


const App = () => {
  // Initially the light is Green
  const [lightStatus, setLightStatus] = useState({
    RedOn: false,
    YellowOn: false,
    GreenOn: true,
  });

  // Run once to setup the state machine
  useEffect(() => {
    service.start();

    service.onTransition(state => {
      console.log(state);
      switch(state.value) {
        case ("GreenOn"): 
          setLightStatus(GREEN_LIGHT);
          break;
        case ("YellowOn"):
          setLightStatus(YELLOW_LIGHT);
          break;
        case ("RedOn"): 
          setLightStatus(RED_LIGHT);
          break;
        default:
          console.log("traffic light is strugglin");
      }
    });
  }, [])

  const changeLight = () => {
    console.log('changing');
    service.send('changeLight');
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <div>
          <TrafficLight {...lightStatus} />
        </div>
        <div>
          <button onClick={changeLight}>Change</button>
        </div>
      </main>
    </div>
  );
}

export default App;
