import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import Boot from './Boot';


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Router>
      <ThemeProvider>
        <Boot />
      </ThemeProvider>
    </Router>
  // </React.StrictMode>
);
