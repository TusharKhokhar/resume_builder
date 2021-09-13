import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from '../src/AuthContext/AuthContext'
import ResumeContextProvider from './ResumeContext/ResumeContext';

ReactDOM.render(
  <AuthContextProvider>
    <ResumeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ResumeContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);

