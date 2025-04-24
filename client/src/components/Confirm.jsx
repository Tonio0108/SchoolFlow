export default function Confirm({ isOpen, title, message,onClose }) {
    if (!isOpen) return null;
  
    return (
      <div id="modal" className="fixed inset-0 flex items-center justify-center z-1">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h1 className="text-lg font-semibold text-center mb-4 text-gray-800">{title}</h1>
          <p className="text-center mb-6 text-gray-700">{message}</p>
          <div className="flex justify-end">
            <button className="border border-emerald-600 px-2 py-1 rounded hover:bg-emerald-600 hover:text-white hover:cursor-pointer me-4">
              Oui
            </button>
            <button onClick={onClose} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 hover:cursor-pointer">
              Non
            </button>
          </div>
        </div>
      </div>
    );
  }
  