export default function Error({ isOpen,message,onClose}) {
    if (!isOpen) return null;
  
    return (
      <div  className="modal fixed inset-0 flex items-center justify-center z-1">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h1 className="text-lg font-semibold text-center mb-4 text-red-500">
            <i className="bi bi-x-circle me-3"></i>
            {message}
          </h1>
          <div className="flex justify-end">
            <button onClick={ onClose } className="border border-emerald-600 px-2 py-1 rounded hover:bg-emerald-600 hover:text-white hover:cursor-pointer me-4">
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
  