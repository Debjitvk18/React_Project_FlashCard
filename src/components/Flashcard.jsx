import React, { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { database } from '../firebase'; 
import { ref, get } from "firebase/database";

const colors = [
  '#ba55d3', 
  '#c4ff4d', 
  '#ff6347', 
  '#4682b4', 
  '#ff1493', 
  '#20b2aa', 
];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const Flashcard = ({ flashcard, currentIndex }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [frontColor, setFrontColor] = useState(getRandomColor());
  const [backColor, setBackColor] = useState(getRandomColor());

  // Reset the flip state whenever the currentIndex changes
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip flipDirection="horizontal" flipSpeedBackToFront={0.01} isFlipped={isFlipped} className="flex justify-center items-center">
      <div
        className="h-[400px] w-[350px] rounded-md shadow-2xl flex justify-center items-center cursor-pointer"
        style={{ backgroundColor: frontColor }}
        onClick={flipCard}
      >
        <h1 className="text-2xl text-white">{flashcard.enter_question}</h1>
      </div>
      <div
        className="h-[400px] w-[350px] rounded-md shadow-2xl flex justify-center items-center cursor-pointer"
        style={{ backgroundColor: backColor }}
        onClick={flipCard}
      >
        <h1 className="text-2xl">{flashcard.enter_answer}</h1>
      </div>
    </ReactCardFlip>
  );
};

const FlashcardApp = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const flashcardRef = ref(database, 'UserData');
        const snapshot = await get(flashcardRef);
        if (snapshot.exists()) {
          const flashcardList = snapshot.val();
          setFlashcards(Object.values(flashcardList));
        } else {
          console.log("No data available");
        }
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className='flex flex-row pt-[200px] ml-[32vw] gap-10'>
      <div className=" text-red-500 cursor-pointer" onClick={handlePrevClick}>
        <FaArrowCircleLeft size={40} className='mt-40' />
      </div>

      {loading ? (
        <p className="text-white">Loading flashcards...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : flashcards.length > 0 ? (
        <Flashcard flashcard={flashcards[currentIndex]} currentIndex={currentIndex} />
      ) : (
        <p className="text-white">No flashcards available</p>
      )}

      <div className=" text-red-500 cursor-pointer" onClick={handleNextClick}>
        <FaArrowCircleRight size={40} className='mt-40' />
      </div>
    </div>
  );
};

export default FlashcardApp;
