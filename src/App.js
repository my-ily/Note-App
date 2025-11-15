import { useState, useEffect } from 'react';
import './App.css';
import { FaSun, FaMoon } from "react-icons/fa";
import AddNoteButton from './components/AddNoteButton';
import NewNote from './components/NewNote';
import testNote from './components/todo';
function App() {

  const [noteList, setNoteList] = useState(()=>{
    // /** ==========================test ============================== */
    //  return JSON.parse(localStorage.getItem("notes")) || testNote
   return JSON.parse(localStorage.getItem("notes")) || []
})
      
  const [Dark, setDark] = useState(true);
  const [SearchValue, setSearchValue] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(noteList);
  const toggleDark = () => setDark(!Dark);




useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(noteList));
}, [noteList]);



  // filter notes
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
<div className={`min-h-screen  p-2 font-mono ${Dark ? "bg-gray-800 text-white" : "bg-[#FFF6E5] text-black"}`}>

      
       <div className="flex-shrink-0 mt-2 sm:mt-0">
    <button
      onClick={toggleDark}
      className={`p-2 rounded-full transition-all duration-300 ${
        Dark ? "text-yellow-400 hover:text-yellow-500" : "text-gray-800 hover:text-gray-600"
      }`}
      aria-label="Toggle Dark Mode"
    >
      {Dark ? <FaSun /> : <FaMoon />}
    </button>
  </div>
<header className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl mx-auto p-4 gap-4">
  {/* Left: Logo */}
  <div className="flex items-center gap-2 flex-shrink-0">
    <img
      src="https://cdn-icons-png.freepik.com/512/7887/7887983.png"
      width={40}
      alt="Notes Logo"
    />
    <h1
      className={`font-extrabold text-2xl sm:text-3xl uppercase ${
        Dark ? "text-white" : "text-black"
      }`}
    >
      Notes
    </h1>
  </div>

  {/* Center: Search */}
  <div className="flex-1 w-full sm:mx-4 mt-2 sm:mt-0">
    <input
      placeholder="Search for a note..."
      value={SearchValue}
      onChange={handleSearchInput}
      className={`w-full px-4 py-2 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        Dark
          ? "bg-gray-700 border-gray-600 text-gray-200"
          : "bg-[#F5EFE6] border-gray-400 text-gray-800 placeholder-gray-600"
      }`}
    />
  </div>

  {/* Right: Dark Mode */}
 
</header>




<div className="p-4 ">
      <hr className="w-80 mx-auto" />
      {/* Add Note Button */}
      <AddNoteButton
        noteList={noteList}
        setNoteList={setNoteList}
        Dark={Dark}
        setDark={setDark}
      />
      {/*  ============================== Notes List ============================== */}
<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-6 p-4">



        {filteredNotes
  .sort((a, b) => b.pinned - a.pinned) //order the pinned
  .map((note, index) => (
    <NewNote
      key={note.id} // 
      note={note}
      index={index}
      noteList={noteList}
      setNoteList={setNoteList}
      Dark={Dark}
      setFilteredNotes={setFilteredNotes}
    />
)) 
/** ==========================test ============================== */
// && testNote.sort((a, b) => b.pinned - a.pinned) //
//   .map((note, index) => (
//     <NewNote
//       key={note.id} //
//       note={note}
//       index={index}
//       noteList={noteList}
//       setNoteList={setNoteList}
//       Dark={Dark}
//       setFilteredNotes={setFilteredNotes}
//     />
// ))

}


      </div>


</div>
    </div>
  );
}

export default App;
