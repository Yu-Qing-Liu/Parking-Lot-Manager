import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {GlobalStatesProvider} from "./GlobalStates";

document.body.style.margin = "0px";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalStatesProvider>
      <App />
    </GlobalStatesProvider>
);


