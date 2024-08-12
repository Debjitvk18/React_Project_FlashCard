import React, { useState } from 'react';

const Dashboard = () => {
  const [addCard, setAddCard] = useState({
    enter_question: '',
    enter_answer: ''
  });
  const [editCard, setEditCard] = useState({
    questionToEdit: '',
    newAnswer: ''
  });
  const [deleteCard, setDeleteCard] = useState({
    questionToDelete: ''
  });

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'add') {
      setAddCard({ ...addCard, [name]: value });
    } else if (type === 'edit') {
      setEditCard({ ...editCard, [name]: value });
    } else if (type === 'delete') {
      setDeleteCard({ ...deleteCard, [name]: value });
    }
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    let url, options, data;

    if (type === 'add') {
      url = 'https://flashcardproject-afb8f-default-rtdb.firebaseio.com/UserData.json';
      data = addCard;
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
    } else if (type === 'edit') {
      const allFlashcards = await fetch('https://flashcardproject-afb8f-default-rtdb.firebaseio.com/UserData.json')
        .then(res => res.json());
      const keyToUpdate = Object.keys(allFlashcards).find(key => allFlashcards[key].enter_question === editCard.questionToEdit);
      if (keyToUpdate) {
        url = `https://flashcardproject-afb8f-default-rtdb.firebaseio.com/UserData/${keyToUpdate}.json`;
        data = { enter_answer: editCard.newAnswer };
        options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
      } else {
        alert('Flashcard question not found');
        return;
      }
    } else if (type === 'delete') {
      const allFlashcards = await fetch('https://flashcardproject-afb8f-default-rtdb.firebaseio.com/UserData.json')
        .then(res => res.json());
      const keyToDelete = Object.keys(allFlashcards).find(key => allFlashcards[key].enter_question === deleteCard.questionToDelete);
      if (keyToDelete) {
        url = `https://flashcardproject-afb8f-default-rtdb.firebaseio.com/UserData/${keyToDelete}.json`;
        options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        };
      } else {
        alert('Flashcard question not found');
        return;
      }
    }

    try {
      const res = await fetch(url, options);
      if (res.ok) {
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} operation successful`);
        // Clear inputs after successful operation
        if (type === 'add') setAddCard({ enter_question: '', enter_answer: '' });
        if (type === 'edit') setEditCard({ questionToEdit: '', newAnswer: '' });
        if (type === 'delete') setDeleteCard({ questionToDelete: '' });
      } else {
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} operation failed`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="navbar w-full h-[60px] flex justify-center items-center text-white bg-black">
        ADMIN PANEL
      </div>

      <div className="w-full h-[500px] flex flex-row justify-center items-center gap-5 p-10">
        
        {/* Add Flashcard Card */}
        <div className="w-[450px] h-[400px] bg-gray-800 rounded-md border border-gray-700 p-6">
          <h1 className="text-white text-2xl mb-4">ADD FLASH CARD</h1>
          <form onSubmit={(e) => handleSubmit(e, 'add')}>
            <input
              type="text"
              name='enter_question'
              placeholder="Enter question"
              value={addCard.enter_question}
              required
              onChange={(e) => handleInputChange(e, 'add')}
              className="w-full p-2 mb-4 text-black rounded"
            />
            <input
              type="text"
              name='enter_answer'
              placeholder="Enter answer"
              value={addCard.enter_answer}
              required
              onChange={(e) => handleInputChange(e, 'add')}
              className="w-full p-2 mb-4 text-black rounded"
            />
            <button
              type="submit"
              className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Add Flashcard
            </button>
          </form>
        </div>

      
        <div className="w-[450px] h-[400px] bg-gray-800 rounded-md border border-gray-700 p-6">
          <h1 className="text-white text-2xl mb-4">EDIT FLASH CARD</h1>
          <form onSubmit={(e) => handleSubmit(e, 'edit')}>
            <input
              type="text"
              name='questionToEdit'
              placeholder="Enter question to edit"
              value={editCard.questionToEdit}
              required
              onChange={(e) => handleInputChange(e, 'edit')}
              className="w-full p-2 mb-4 text-black rounded"
            />
            <input
              type="text"
              name='newAnswer'
              placeholder="Enter new answer"
              value={editCard.newAnswer}
              required
              onChange={(e) => handleInputChange(e, 'edit')}
              className="w-full p-2 mb-4 text-black rounded"
            />
            <button
              type="submit"
              className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Edit Flashcard
            </button>
          </form>
        </div>

        
        <div className="w-[450px] h-[400px] bg-gray-800 rounded-md border border-gray-700 p-6">
          <h1 className="text-white text-2xl mb-4">DELETE FLASH CARD</h1>
          <form onSubmit={(e) => handleSubmit(e, 'delete')}>
            <input
              type="text"
              name='questionToDelete'
              placeholder="Enter question to delete"
              value={deleteCard.questionToDelete}
              required
              onChange={(e) => handleInputChange(e, 'delete')}
              className="w-full p-2 mb-4 text-black rounded"
            />
            <button
              type="submit"
              className="w-full p-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Delete Flashcard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
