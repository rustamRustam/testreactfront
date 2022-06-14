import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";

import App from './components/App/App';
const root = ReactDOM.createRoot(document.getElementById('root'));

const toogleDarkTema = function(){
    document.body.classList.toggle("finter-invert");
}

root.render(
  <React.StrictMode>
    <App location={window.location} darkTema={toogleDarkTema} />
  </React.StrictMode>
);
