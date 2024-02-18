import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from './context/GlobalContext';
import 'bootstrap/dist/css/bootstrap.min.css';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
// axios.defaults.baseURL = "http://localhost:5000"

const LoadingComponent = () => {
  return (
    <div style={{ display: 'flex' }}>
      Loading...
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <Suspense fallback={<div className='m-5'>Loading...</div>}>
          <App />
        </Suspense>

      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

