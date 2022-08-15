import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './app/store'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/*' element={<App/>} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);