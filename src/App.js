import { useState, useEffect } from 'react';
import './App.css';
import { FaSun, FaMoon } from "react-icons/fa";
import AddNoteButton from './components/AddNoteButton';
import NewNote from './components/NewNote';

function App() {
  const [noteList, setNoteList] = useState([])
      
  const [Dark, setDark] = useState(true);
  const [SearchValue, setSearchValue] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(noteList);
  const toggleDark = () => setDark(!Dark);




useEffect(()=>{
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNoteList(savedNotes);
 

},[])

useEffect(()=>{

localStorage.setItem("notes",JSON.stringify(noteList) )
  console.log("تم تحديث localStorage:", noteList);

},[noteList])



  // فلترة الملاحظات
  useEffect(() => {
    if (!SearchValue.trim()) {
      setFilteredNotes(noteList);
    } else {
      setFilteredNotes(
        noteList.filter(note =>
    note.noteDescription.toLowerCase().includes(SearchValue.toLowerCase()) ||
    note.noteTitle.toLowerCase().includes(SearchValue.toLowerCase())
    
        )
      );
    }
  }, [SearchValue, noteList]);

  const handleSearchInput = (e) => setSearchValue(e.target.value);

  return (
<div className={`min-h-screen border p-2 font-mono ${Dark ? "bg-gray-800 text-white" : "bg-[#FFF6E5] text-black"}`}>

      
      
<header className="p-4 w-full max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 z-50">
  {/* Left: Logo + Title */}
  <div className="flex items-center gap-2">
    <img
      src="https://cdn-icons-png.freepik.com/512/7887/7887983.png?ga=GA1.1.883497224.1762207877"
      width={40}
      alt="Notes Logo"
    />
<h1
  className={`font-extrabold text-2xl sm:text-3xl uppercase ${Dark ? "text-white" : "text-black"}`}
>
  Notes
</h1>

  </div>

  {/* Right: Search + Dark Mode */}
  <div className="flex flex-1 sm:flex-row items-center gap-3 w-full sm:w-auto ">
<input
  placeholder="Search for a note..."
  value={SearchValue}
  onChange={handleSearchInput}
  className={`flex-1 w-full sm:w-80 px-4 py-2 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
    Dark
      ? "bg-gray-700 border-gray-600 text-gray-200"
      : "bg-[#F5EFE6] border-gray-400 text-gray-800 placeholder-gray-600"
  }`}
/>



    <button
      onClick={toggleDark}
      className={`p-2 rounded-full transition-all duration-300 ${Dark ? "text-yellow-400 hover:text-yellow-500" : "text-gray-800 hover:text-gray-600"}`}
      aria-label="Toggle Dark Mode"
    >
      {Dark ? <FaSun /> : <FaMoon />}
    </button>
  </div>
</header>


<div className="p-4">
      <hr className="w-80 mx-auto" />
      {/* Add Note Button */}
      <AddNoteButton
        noteList={noteList}
        setNoteList={setNoteList}
        Dark={Dark}
        setDark={setDark}
      />
      {/*  ============================== Notes List ============================== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 mt-4">
        {noteList
  .sort((a, b) => b.pinned - a.pinned) // المثبتة تظهر أولاً
  .map((note, index) => (
    <NewNote
      key={note.id} // الأفضل استخدام id فريد بدل index
      note={note}
      index={index}
      noteList={noteList}
      setNoteList={setNoteList}
      Dark={Dark}
    />
))

}


{/* 

        {filteredNotes
  .sort((a, b) => b.pinned - a.pinned)
  .map((note, index) => (
    <NewNote
      key={index}
      note={note}
      index={index}
      noteList={noteList}
      setNoteList={setNoteList}
      Dark={Dark}
    />
))
} */}
      </div>


</div>
    </div>
  );
}

export default App;
