import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'; 
import './index.css';
import { UserProvider } from './context/UserContext';
import { SocketProvider } from './context/SocketContext';
import App from './App';
import Footer from './footer';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <SocketProvider>
          <BrowserRouter>
            <App />
          <Footer />
        </BrowserRouter>
    </SocketProvider>
  </UserProvider>

);
reportWebVitals();
