import React,{useState} from 'react';
import { FaEdit, FaTimes } from "react-icons/fa";
import EditNote from './EditNote';
function NewNote({ note, index, noteList, setNoteList,Dark,setDark }) {
const[EditModel,setEditModel]=useState(false)

const handleDelete=()=>{
 const newList = noteList.filter((_, i) => i !== index);
          setNoteList(newList);
}
const handleEdit=()=>{

}



  return (
<div className=" gap-6 p-4 min-w-32">

    <div
      key={index}
      className={` h-64 relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-y-auto`}
    >
              {/* Delete Button */}
              <div className=" sticky top-0 right-0  flex flex-row gap-4 text-center mb-2 ">
      <button
         onClick={handleDelete}
        className="self-end text-red-500 hover:text-red-700"
      >
        &#x2715;
      </button>

{/* 
    <EditNote
    noteList={noteList}
    setNoteList={setNoteList}
    note={note}
    index={index}
    onClick={setEditModel(true)}
    /> */}
      </div>
      {/* Vertical bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-l ${
          Dark ? "bg-gray-600" : "bg-gray-700"
        }`}
      ></div>

      {/* Note Text */}
      <p className="ml-3 break-words text-sm sm:text-base flex-1">
        {note.noteDescription}
      </p>


    </div>

</div>

  );
}

export default NewNote;
