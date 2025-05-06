import { useEffect, useState } from "react";
import Confirm from "../components/Confirm";
import Dropdown from "../components/DropDownActions";
import Success from "../components/Success";
import Error from "../components/Error";
export default function Salles(){

    const [openModal, setOpenModal] = useState(false)
    const [openModalSuccess, setOpenModalSuccess] = useState(false)
    const [openModalUpdateSuccess, setOpenModalUpdateSuccess] = useState(false)
    const [openModalError, setOpenModalError] = useState(false)
    const [openModalUpdateError, setOpenModalUpdateError] = useState(false)
    const [ openForm, setOpenForm ] = useState(false)
    const [ openAddForm, setOpenAddForm ] = useState(false)
    const [ salles, setSalles ] = useState([])
    const [ salleId, setSalleId ] = useState('')
    const [searchTerm, setSearchTerm] = useState('');


    const fetchSalles = () => {
        fetch('http://localhost:3000/salle')
          .then(res => res.json())
          .then(data => setSalles(data))
          .catch(err => console.error(err));
      };
      
    useEffect(() => {
    fetchSalles();
    }, []);

    const Destroy = (id) => {
    fetch(`http://localhost:3000/salle/supprimer/${id}`, {
        method: 'DELETE'
    })
        .then(res => {
        if (!res.ok) throw new Error('Erreur lors de la suppression');
        return res.text();
        })
        .then(() => {
        fetchSalles(); // <--- Recharge les données
        setOpenModal(false);
        setOpenModalSuccess(true);
        })
        .catch(err => {
        console.error('Erreur:', err);
        setOpenModalError(true)
        });
    };

    const updateSalle = (idsalle, nomsalle) => {
        fetch(`http://localhost:3000/salle/modifier/${idsalle}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nomsalle }),
        })
          .then(res => {
            if (!res.ok) throw new Error('Erreur lors de la modification');
            return res.text();
          })
          .then(data => {
            console.log('Matière modifiée:', data);
            setOpenForm(false);
            setOpenModalUpdateSuccess(true);
            fetchSalles();
          })
          .catch(() => setOpenModalUpdateError(true));
      };

      const AddSalle = (nomsalle) => {
        fetch(`http://localhost:3000/salle/ajouter`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nomsalle }),
        })
          .then(res => {
            if (!res.ok) throw new Error('Erreur lors de la creation');
            return res.text();
          })
          .then(data => {
            console.log('Salle ajouté:', data);
            setOpenAddForm(false);
            setOpenModalUpdateSuccess(true);
            fetchSalles();
          })
          .catch(() => setOpenModalUpdateError(true));
      };
      

    const filteredSalles = salles.filter((salle) =>
      salle.nomsalle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
      
    return(
        <>
            <div className="flex justify-center h-full w-full p-3">
                <div className='w-full my-auto h-6/7 text-center p-3'>
                    <div className="flex flex-col h-full">
                        <h1 className="mb-3 font-semibold text-lg">Liste des salles dans notre établissement</h1>
                        <div className="mt-2 py-3 shadow">
                          <input 
                              className="me-4 px-3 py-1 text-gray-800 outline-0 border
                              border-gray-400  shadow rounded
                              focus:shadow focus:shadow-emerald-600" 
                              name="NomMatiere" 
                              type="text"
                              placeholder="entrer pour rechercher"
                              onChange={(e) => setSearchTerm(e.target.value)} />
                          <button className="self-start px-2 py-1 bg-emerald-600 rounded
                                text-white
                                hover:bg-emerald-700 hover:cursor-pointer transition ms-5
                          "
                                onClick={() => setOpenAddForm(true)}>
                              <i className="bi bi-plus"></i>
                          </button>

                        </div>
                        <div className=" mt-3 overflow-scroll flex flex-col h-4/5">
                            <table className="text-sm">
                                <thead className="text-gray-800">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nom de la salle</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { filteredSalles.map((salle) => (
                                        <tr key={salle.idsalle}>
                                            <td>{ salle.idsalle }</td>
                                            <td>{ salle.nomsalle }</td>
                                            <td className="text-start">
                                            <Dropdown 
                                                onUpdate={() => {
                                                    setSalleId(salle.idsalle)
                                                    setOpenForm(true)
                                                }} 
                                                onDelete={() => { 
                                                    setSalleId(salle.idsalle);
                                                    setOpenModal(true);
                                                }} 
                                            />
                                            </td>
                                        </tr>
                                    ))
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <Confirm 
                    isOpen={openModal} 
                    title={'Suppression'} 
                    message={'Voulez vous vraiment supprimer cette salle ?'}
                    onClose={() => setOpenModal(false)}
                    onConfirm={() => Destroy(salleId)} />
                <Success
                    isOpen={openModalSuccess} 
                    message={'Suppression efféctuée'}
                    onClose={() => setOpenModalSuccess(false)} />
                <Success
                    isOpen={openModalUpdateSuccess} 
                    message={'Mise à jour efféctuée'}
                    onClose={() => setOpenModalUpdateSuccess(false)} />
                <EditModal 
                isOpen={openForm} 
                onClose={() => setOpenForm(false)} 
                onSubmit={(newNom) => updateSalle(salleId, newNom)} 
                />
                <Error
                    isOpen={openModalError} 
                    message={'Erreur de suppression'}
                    onClose={() => setOpenModalError(false)} />
                <Error
                    isOpen={openModalUpdateError} 
                    message={'Erreur de Mise à jour'}
                    onClose={() => setOpenModalUpdateError(false)} />

                <AddModal 
                isOpen={openAddForm} 
                onClose={() => setOpenAddForm(false)} 
                onSubmit={(newNom) => AddSalle(newNom)} 
                />


            </div>
        </>
    )
}

function EditModal({ isOpen, onClose, onSubmit }) {
    const [nomSalle, setNomSalle] = useState('');
  
    if (!isOpen) return null;
  
    return (
      <div className="modal fixed inset-0 flex items-center justify-center z-1">
        <div className="bg-white rounded-lg shadow-lg p-6 w-100">
          <h1 className="text-lg font-semibold text-center mb-4 text-gray-800">
            Modification d'une salle
          </h1>
  
          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(nomSalle);
          }}>
            <label className="block text-gray-800 me-4 mb-3" htmlFor="NomSalle">Nom de la salle :</label>
            <input 
              value={nomSalle}
              onChange={(e) => setNomSalle(e.target.value)}
              className="me-4 mb-4 w-full px-3 py-1 text-gray-800 outline-0 border
              border-gray-400  shadow rounded
              focus:shadow focus:shadow-emerald-600" 
              name="NomSalle" 
              type="text" 
            />
  
            <div className="flex justify-end mt-5">
              <button type="submit" className=" me-4 bg-emerald-600 text-white px-2 py-1 rounded hover:bg-emerald-700 hover:cursor-pointer transition">
                Enregistrer
              </button>
              <button onClick={onClose} type="button" className="border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white hover:cursor-pointer transition">
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

function AddModal({ isOpen, onClose, onSubmit }) {

  const [nomSalle, setNomSalle] = useState('');
  
  if (!isOpen) return null;
  
  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-1">
      <div className="bg-white rounded-lg shadow-lg p-6 w-100">
        <h1 className="text-lg font-semibold text-center mb-4 text-gray-800">
          Ajout d'une salle
        </h1>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(nomSalle);
        }}>
          <label className="block text-gray-800 me-4 mb-3" htmlFor="NomSalle">Nom de la salle :</label>
          <input 
            value={nomSalle}
            onChange={(e) => setNomSalle(e.target.value)}
            className="me-4 mb-4 w-full px-3 py-1 text-gray-800 outline-0 border
            border-gray-400  shadow rounded
            focus:shadow focus:shadow-emerald-600" 
            name="NomSalle" 
            type="text" 
          />

          <div className="flex justify-end mt-5">
            <button type="submit" className=" me-4 bg-emerald-600 text-white px-2 py-1 rounded hover:bg-emerald-700 hover:cursor-pointer transition">
              Enregistrer
            </button>
            <button onClick={onClose} type="button" className="border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white hover:cursor-pointer transition">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
  