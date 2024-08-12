import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Flashcard from './components/Flashcard';
import AdminAccess from './components/Adminaccess';
import Dashboard from './components/Dashboard';
function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Flashcard" element={<Flashcard/>} />
        <Route path="/AdminAccess" element={<AdminAccess />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
  
  );
}

export default App;
