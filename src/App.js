import './App.css';
import React from 'react';
import { render } from 'react-dom';
import { SignIn } from './pages/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Router } from './routes/Router';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
