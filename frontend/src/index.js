import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './features/AuthContext';
import reportWebVitals from './reportWebVitals';
import ContextPorvider from './features/ContextProvider';
import ScrollRestoration from './components/Scroll';
import App from './App';
import './styles/global.scss';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollRestoration />
      <AuthProvider>
        <ContextPorvider>
          <App />
        </ContextPorvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
