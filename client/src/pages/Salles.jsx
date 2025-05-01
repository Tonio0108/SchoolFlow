import { useState } from "react";
import Confirm from "../components/Confirm";
import Dropdown from "../components/DropDownActions";

export default function Salles(){

    const [openModal, setOpenModal] = useState(false)
    const [ openForm, setOpenForm ] = useState(false)
    return(
        <>
            <div className="flex justify-center h-full w-full p-3">
                <div className='w-full my-auto h-6/7 text-center p-3'>
                    <div className="flex flex-col h-full">
                        <h1 className="mb-3 font-semibold text-lg">Liste des salles dans notre établissement</h1>
                        <div className="mt-2 py-3 shadow">
                            <form action="">
                                <label className="text-gray-800 me-4" htmlFor="classId">Identifiant :</label>
                                <input 
                                    className="w-30 me-4 px-3 py-1 text-gray-800 outline-0 border
                                     border-gray-400 shadow rounded
                                     focus:shadow focus:shadow-emerald-600" 
                                    name="RoomId" 
                                    type="text" />
                                <label className="text-gray-800 me-4" htmlFor="RoomLabel">Libellé :</label>
                                <input 
                                    className="me-4 px-3 py-1 text-gray-800 outline-0 border
                                     border-gray-400 shadow rounded
                                     focus:shadow focus:shadow-emerald-600" 
                                    name="className" 
                                    type="text" />
                                <button className="self-start px-2 py-1 bg-emerald-600 rounded
                                text-white
                                hover:bg-emerald-700 hover:cursor-pointer transition ms-5
                                ">
                                    ajouter
                                </button>
                            </form>

                        </div>
                        <div className=" mt-3 overflow-scroll flex flex-col h-4/5">
                            <table className="text-sm">
                                <thead className="text-gray-800">
                                    <tr>
                                        <th>Identifiant de la salle</th>
                                        <th>Libellé</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>L3GBgr1</td>
                                        <td>L3 Génie Logiciel et Base de Donnéé groupe 1</td>
                                        <td className="text-start">
                                            <Dropdown onUpdate={() => setOpenForm(true)} onDelete={() => setOpenModal(true)} />
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <Confirm 
                    isOpen={openModal} 
                    title={'Suppression'} 
                    message={'Voulez vous vraiment supprimer cette salle ?'}
                    onClose={() => setOpenModal(false)} />
                <EditModal isOpen={openForm} onClose={() => setOpenForm(false)} />
            </div>
        </>
    )
}

function EditModal({isOpen,onClose}){
    if (!isOpen) return null

    return (
        <div  className="modal fixed inset-0 flex items-center justify-center z-1">
          <div className="bg-white rounded-lg shadow-lg p-6 w-100">
            <h1 className="text-lg font-semibold text-center mb-4 text-gray-800">
              Modification d'une salle
            </h1>

            <form action="">
                <label className="block text-gray-800 me-4 mb-3" htmlFor="RoomId">Identifiant :</label>
                <input 
                    className="me-4 mb-4 w-full px-3 py-1 text-gray-800 outline-0 border
                     border-gray-400  shadow rounded
                     focus:shadow focus:shadow-emerald-600" 
                    name="classId" 
                    type="text" />
                <label className="block text-gray-800 me-4 mb-3" htmlFor="RoomLabel">Libellé :</label>
                <input 
                    className="me-4 mb-4 w-full px-3 py-1 text-gray-800 outline-0 border
                     border-gray-400  shadow rounded
                     focus:shadow focus:shadow-emerald-600" 
                    name="className" 
                    type="text" />
            </form>

            <div className="flex justify-end mt-5">
              <button className=" me-4 bg-emerald-600 text-white px-2 py-1 rounded hover:bg-emerald-700 hover:cursor-pointer transition">
                Enregistrer
              </button>
              <button onClick={onClose} className="border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white hover:cursor-pointer transition">
                Annuler
              </button>
            </div>
          </div>
        </div>
    );
}