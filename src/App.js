import './App.css';
import React from 'react';
import { render } from 'react-dom';
import { SignIn } from './pages/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

// render(<App />, document.getElementById('root'));

export default App;
