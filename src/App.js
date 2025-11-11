import { useState } from 'react';
import './App.css';
import { FaSun, FaMoon } from "react-icons/fa";
import AddNoteButton from './components/AddNoteButton';
import NewNote from './components/NewNote';

function App() {
  const [noteList, setNoteList]=useState([])
  const [Dark,setDark]= useState(1)
  

const toggleDark=()=>setDark(!Dark)

  return (
<div className={`min-h-screen font-mono ${Dark ? "bg-gray-800 text-white" : "bg-white text-black"}`}>

  <div className="p-4 top-4 left-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 z-50">
    {/* Title */}
    <h1 className="font-bold text-lg sm:text-2xl">keep notes</h1>

    {/* Buttons */}
    <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-0">
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDark}
        className={`p-2 rounded-full transition ${
          Dark ? " text-yellow-400 " : "text-gray-800 "
        }`}
      >
        {Dark ? <FaSun /> : <FaMoon />}
      </button>

      {/* Add Note Button */}
      <AddNoteButton
        noteList={noteList}
        setNoteList={setNoteList}
        Dark={Dark}
        setDark={setDark}
      />
    </div>
  </div>
<hr className='w-80'/>
  {/* Notes List */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-2">
    {noteList.map((note, i) => (
      <NewNote
        key={i}
        note={note}
        index={i}
        noteList={noteList}
        setNoteList={setNoteList}
        Dark={Dark}
        setDark={setDark}
      />
    ))}
  </div>
</div>

  );
}

export default App;
