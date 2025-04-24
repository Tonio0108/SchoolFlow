import { useState } from "react";
import Confirm from "../components/Confirm";
import Dropdown from "../components/DropDownActions";

export default function Classes(){

    const [openModal, setOpenModal] = useState(false)
    return(
        <>
            <div className="flex justify-center h-full w-full p-3">
                <div className='w-full my-auto h-6/7 text-center p-3'>
                    <div className="flex flex-col h-full">
                        <h1 className="mb-3 font-semibold text-lg">Liste des classes dans notre établissement</h1>
                        <div className="mt-2 py-3 shadow">
                            <form action="">
                                <label className="text-gray-800 me-4" htmlFor="classId">Identifiant :</label>
                                <input 
                                    className="w-30 me-4 px-3 text-gray-800 outline-0 border
                                     border-gray-200 shadow rounded
                                     focus:shadow focus:shadow-emerald-600" 
                                    name="classId" 
                                    type="text" />
                                <label className="text-gray-800 me-4" htmlFor="className">Nom de la classe :</label>
                                <input 
                                    className="me-4 px-3 text-gray-800 outline-0 border
                                     border-gray-200 shadow rounded
                                     focus:shadow focus:shadow-emerald-600" 
                                    name="className" 
                                    type="text" />
                                <button className="self-start px-2 py-1 bg-emerald-600 rounded
                                text-white
                                hover:bg-emerald-700 hover:cursor-pointer ms-5
                                ">
                                    ajouter
                                </button>
                            </form>

                        </div>
                        <div className=" mt-3 overflow-scroll flex flex-col h-4/5">
                            <table className="text-sm">
                                <thead className="text-gray-800">
                                    <tr>
                                        <th>Identifiant de la classe</th>
                                        <th>Nom de la classe</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>L3GBgr1</td>
                                        <td>L3 Génie Logiciel et Base de Donnéé groupe 1</td>
                                        <td className="text-start">
                                            <Dropdown onUpdate="" onDelete={() => setOpenModal(true)} />
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <Confirm 
                    isOpen={openModal} 
                    title={'suppression'} 
                    message={'Voulez vous vraiment supprimer cette classe ?'}
                    onClose={() => setOpenModal(false)} />
            </div>
        </>
    )
}