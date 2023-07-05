import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/pages/login';
import Events from './components/pages/events';
import Settings from './components/pages/settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;