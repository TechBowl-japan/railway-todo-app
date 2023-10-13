import './App.css';
import React from 'react';
// import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
// import { Router } from './routes/Router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
