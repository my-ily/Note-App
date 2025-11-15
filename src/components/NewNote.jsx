import React, { useState ,useRef} from 'react';
import { FaEdit, FaTimes, FaExpand,FaThumbt } from "react-icons/fa";
import { BiPin } from "react-icons/bi";
import EditNote from './EditNote';

// import Draggable from 'react-draggable'
// import { FaThumbt } from "react-icons/fa";
/**
 * shows note card (title - des )
 * DELETE
 * Expanded
 * Pinned
 * Date - Time
 */
function NewNote({ note, index, noteList, setNoteList, Dark,setFilteredNotes }) {
    const nodeRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
   const [isPinned, setIsPinned] = useState(false);
  const [currentDate] = useState(new Date());

  const handleDelete = () => {
    const newList = noteList.filter((_, i) => i !== index);
    setNoteList(newList);
  };



const togglePin = () => {
  //convert
  const newList = noteList.map(n =>
    n.id === note.id ? { ...n, pinned: !n.pinned } : n
  );
  //  رجعنا نعين النوتس لان  لازم بعد كل تغير نرجع نسوي نسخه كامله ونرجعها عن طريق ..n
// نعيد تعيين قائمه النوتات الاصليه لان الحاله (state) في رياكت لايمكن التعديل عليها مباشره ف نسوي نسخه عن طريق ماب بعدها نعدل 
//بعدها نمرر النسخة الجديدة إلى setNoteList حتى React يكتشف التغيير ويعيد تحديث الواجهة.
  setNoteList(newList);
  setFilteredNotes(newList); // 
};

  return (
    
    <div className="gap-6 p-4 min-w-32 max-w-80  ">

      <div 
  key={index}
  className={`h-48 w-64 md:gap-3  rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-y-auto
    ${Dark ? "bg-gray-800 text-white" : "bg-yellow-100 text-gray-900"}`}
  style={{ transform: `rotate(${Math.random() * 4 - 2}deg)` }}
>
<button onClick={togglePin}>
<BiPin className={`${ note.pinned ? "text-red-600" : "text-gray-400" }`} />
  </button>
  {/* (Delete, Edit, Expand) */}
  <div className="absolute top-2 right-2 flex gap-2 z-10 text-center ">
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-white hover:bg-red-500 p-1 rounded transition"
    >
      <FaTimes />
    </button>
    <EditNote
      note={note}
      index={index}
      noteList={noteList}
      setNoteList={setNoteList}
      Dark={Dark}
    />
    <button
      onClick={() => setIsExpanded(true)}
      className="text-gray-500 hover:text-white hover:bg-gray-500 p-1 rounded transition"
    >
      <FaExpand />
    </button>
  </div>

  {/* Title & Description */}
  <p className="ml-3 font-bold text-lg truncate">{note.noteTitle}</p>
<p
  className="ml-3 mt-2 text-sm line-clamp-3 dark:text-gray-300"
  style={{ color: "#3d3d3dff" }}
>
  {note.noteDescription}
</p>


  {/* Date & Time */}
  <div className="mt-auto ml-3 text-gray-400 text-xs flex justify-between">
    <span>{currentDate.toLocaleDateString()}</span>
    <span>
      {currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </span>
  </div>
</div>


      {/* Expanded card */}
      {isExpanded && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className={`relative w-full max-w-3xl rounded-xl p-6 shadow-2xl ${Dark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setIsExpanded(false)}
            >
              <FaTimes size={20} />
            </button>

            {/* Title & Description */}
            <h2 className="text-2xl font-bold mb-4">{note.noteTitle}</h2>
            <p className="text-lg">{note.noteDescription}</p>

            {/* Date & Time */}
            <div className="mt-4 text-gray-400 text-sm flex justify-end gap-4">
              <span>{currentDate.toLocaleDateString()}</span>
              <span>{currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewNote;
