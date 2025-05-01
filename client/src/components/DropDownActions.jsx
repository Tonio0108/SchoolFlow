import { useState } from 'react';

const Dropdown = ({ onUpdate, onDelete, }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className=" px-3 py-1 hover:cursor-pointer"
      >
        <i className='bi bi-three-dots-vertical'></i>
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={() =>
              {
                onUpdate?.()
                setOpen(!open)
              }
              }
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
                <i className='bi bi-pencil me-2'></i>
              Modifier
            </button>
            <button
              onClick={() => {
                onDelete?.()
                setOpen(!open)    
              }}
              className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
                <i className='bi bi-trash me-2'></i>
              Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
