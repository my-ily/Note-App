import { FaPlus } from "react-icons/fa";
import { FaEdit, FaTimes } from "react-icons/fa";
import { useState ,useEffect } from "react";
function AddNoteButton({note,index,noteList,setNoteList,Dark,setDark}) {

    const[Model,setModel]=useState(false)
const [noteDescription , setNoteDescription]=useState('')
const [noteTitle, setNoteTitle]=useState('')
const [errorMessage, setError]=useState("");









const handleAdd =(e)=>{
   e.preventDefault()

if(!noteTitle){
     setError("pleaes enter text before sending")
    setTimeout(() => {
          setError("")
    }, 2000);
  
}
    else{
const newNote = {
  id: Date.now(),
  noteTitle,
  noteDescription,
  pinned: false 
};
setNoteList([...noteList, newNote]);


  // setNoteList([...noteList,   { id: Date.now(), noteTitle, noteDescription }])

   setNoteTitle('');
setNoteDescription('');
setModel(false);

        }
}

const handleInput =(e)=>{

  const{name,value}=e.target
      //  setNoteDescription(e.target.value);

if(name === "note-Title")setNoteTitle(value)

if(name === "note-Des")setNoteDescription(value)


}

  return (
<div className="flex flex-col items-center mt-4">

  {/* Add Note Button */}
<button
  onClick={() => setModel(true)}
  className={`flex items-center px-4 py-2 rounded font-medium transition-colors ${
   Dark
      ? "bg-gray-700 text-white hover:bg-gray-600"
      : "bg-blue-400 text-gray-900 hover:bg-blue-300"
  }`}
>
  <FaPlus className="mr-2" /> Add Note
</button>


  {/* Modal */}
  {Model && (

   <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        
  <div
    className={`grid grid-cols-6 gap-3 rounded-xl p-4 text-sm shadow-lg hover:shadow-xl transition-all duration-300 relative w-11/12 max-w-lg
      ${Dark ? "bg-gray-800 border-gray-700 text-white" : "bg-gradient-to-br from-white to-slate-50 border border-slate-200 text-slate-900"}
    `}
  >
    {/* Close Button */}
    <button
      className={`absolute top-3 right-3 ${
        Dark ? "text-gray-300 hover:text-white" : "text-slate-500 hover:text-slate-700"
      }`}
      onClick={() => setModel(false)}
    >
      &#x2715;
    </button>

    {/* Title */}
    <h1
      className={`text-center text-2xl font-bold col-span-6 mb-2 ${
        Dark ? "text-white" : "bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent"
      }`}
    >
      Add Note
    </h1>

<input
  type="text"
  name="note-Title"
  placeholder="Title"
  value={noteTitle}
  onChange={handleInput}
  className={`col-span-6  rounded-lg p-3 resize-none outline-none border duration-300 focus:ring-2 focus:shadow-inner ${
        Dark
          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-600"
          : "bg-slate-50/80 border border-slate-200 text-slate-600 placeholder:text-slate-400 focus:border-slate-600 focus:ring-slate-200"
      }`}
/>

    {/* Note Textarea */}
    <textarea
      className={`col-span-6 h-32 rounded-lg p-3 resize-none outline-none border duration-300 focus:ring-2 focus:shadow-inner ${
        Dark
          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-600"
          : "bg-slate-50/80 border border-slate-200 text-slate-600 placeholder:text-slate-400 focus:border-slate-600 focus:ring-slate-200"
      }`}
      placeholder="Write your note..."
      name="note-Des"
      value={noteDescription}
      onChange={handleInput}
    ></textarea>

    {/* Error Message */}
    {errorMessage && (
      <p className="col-span-6 text-red-500 text-center mt-1">
        {errorMessage}
      </p>
    )}

    {/* Add Button */}
    <button
      className={`col-span-6 flex items-center justify-center gap-2 rounded-lg p-3 mt-2 duration-300 hover:shadow-md ${
        Dark
          ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          : "bg-slate-50/80 border border-slate-200 text-slate-600 hover:bg-slate-100"
      }`}
      onClick={handleAdd}
      type="submit"
    >
      <span className="font-medium group-hover:text-slate-800">Add Note</span>
    </button>

  </div>
</div>

  )}
</div>


  );
}

export default AddNoteButton;
