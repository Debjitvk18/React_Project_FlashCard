import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();

  function handleUserClick() {
    navigate("/Flashcard");
  }

  function handleAdminClick() {
    navigate("/AdminAccess"); 
  }

  return (
    <div className='w-full h-screen bg-black flex justify-center items-center gap-10'>
      <button 
        className='w-[200px] h-[70px] rounded-full bg-blue-600 text-white'
        onClick={handleUserClick}
      >
        USER
      </button>
      <button 
        className='w-[200px] h-[70px] rounded-full bg-red-500 text-white'
        onClick={handleAdminClick}
      >
        ADMIN
      </button>
    </div>
  );
}

export default Home;
