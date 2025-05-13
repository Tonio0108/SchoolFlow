import { useEffect, useState } from "react";
import Confirm from "../components/Confirm";
import Dropdown from "../components/DropDownActions";
import Success from "../components/Success";
import Error from "../components/Error";
export default function Matieres(){

    const [openModal, setOpenModal] = useState(false)
    const [openModalSuccess, setOpenModalSuccess] = useState(false)
    const [openModalError, setOpenModalError] = useState(false)
    const [openModalUpdateSuccess, setOpenModalUpdateSuccess] = useState(false)
    const [openModalUpdateError, setOpenModalUpdateError] = useState(false)
    const [ openForm, setOpenForm ] = useState(false)
    const [ openAddForm, setOpenAddForm ] = useState(false)
    const [ profs, setProfs ] = useState([])
    const [ profId, setProfId ] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [nomProf, setNomProf] = useState('')
    const [prenomsProf, setPrenomsProf] = useState('')
    const [identifiant, setIdentifiant] = useState('')

    const fetchProfs = () => {
        fetch('http://localhost:3000/professeur')
          .then(res => res.json())
          .then(data => setProfs(data))
          .catch(err => console.error(err));
      };
      
    useEffect(() => {
    fetchProfs();
    }, []);

    const Destroy = (id) => {
    fetch(`http://localhost:3000/professeur/supprimer/${id}`, {
        method: 'DELETE'
    })
        .then(res => {
        if (!res.ok) throw new Error('Erreur lors de la suppression');
        return res.text();
        })
        .then(() => {
        fetchProfs(); // <--- Recharge les données
        setOpenModal(false);
        setOpenModalSuccess(true);
        })
        .catch((err) => {
        console.error('Erreur:', err);
          setOpenModalError(true)
        });
    };

    const updateProf = (id, nomProfesseur, prenomsProfesseur, identifiant) => {
        fetch(`http://localhost:3000/professeur/modifier/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nomProfesseur, prenomsProfesseur, identifiant}),
        })
          .then(res => {
            if (!res.ok) throw new Error('Erreur lors de la modification');
            return res.text();
          })
          .then(data => {
            console.log('professeur modifiée:', data);
            setOpenForm(false);
            setOpenModalUpdateSuccess(true);
            fetchProfs()
          })
          .catch(() => setOpenModalUpdateError(true));
      };

    const AddProf = (nomProfesseur, prenomsProfesseur,identifiant) => {
      fetch(`http://localhost:3000/professeur/ajouter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nomProfesseur, prenomsProfesseur,identifiant }),
      })
        .then(res => {
          if (!res.ok) throw new Error('Erreur lors de la creation');
          return res.text();
        })
        .then(data => {
          console.log('Matière ajouté:', data);
          setOpenAddForm(false);
          setOpenModalUpdateSuccess(true);
          fetchProfs()
        })
        .catch( () => setOpenModalUpdateError(true));
    };

    const filteredProfs = profs.filter((prof) =>
      prof.nomprofesseur.toLowerCase().includes(searchTerm.toLowerCase()) || prof.prenomsprofesseur.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
      
    return(
        <>
            <div className="flex justify-center h-full w-full p-3">
                <div className='w-full my-auto h-6/7 text-center p-3'>
                    <div className="flex flex-col h-full">
                        <h1 className="mb-3 font-semibold text-lg">Liste des enseignants dans notre établissement</h1>
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
                                        <th>Numero</th>
                                        <th>Identifiant</th>
                                        <th>Nom et prénoms</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { filteredProfs.map((prof) => (
                                        <tr key={prof.idprofesseur}>
                                            <td>{ prof.idprofesseur }</td>
                                            <td>{ prof.identifiant }</td>
                                            <td>{ prof.nomprofesseur + ' ' + prof.prenomsprofesseur }</td>
                                            
                                            <td className="text-start">
                                            <Dropdown 
                                                onUpdate={() => {
                                                    setProfId(prof.idprofesseur)
                                                    setOpenForm(true)
                                                    setNomProf(prof.nomprofesseur)
                                                    setPrenomsProf(prof.prenomsprofesseur)
                                                    setIdentifiant(prof.identifiant)
                                                }} 
                                                onDelete={() => { 
                                                    setProfId(prof.idprofesseur);
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
                    onConfirm={() => Destroy(profId)} />
                <Success
                    isOpen={openModalSuccess} 
                    message={'Suppression efféctuée'}
                    onClose={() => setOpenModalSuccess(false)} />
                <Success
                    isOpen={openModalUpdateSuccess} 
                    message={'Mise à jour efféctuée'}
                    onClose={() => setOpenModalUpdateSuccess(false)} />
                <Error
                    isOpen={openModalError} 
                    message={'Erreur de suppression'}
                    onClose={() => setOpenModalError(false)} />
                  <Error
                    isOpen={openModalUpdateError} 
                    message={'Erreur de Mise à jour'}
                    onClose={() => setOpenModalUpdateError(false)} />
                <EditModal 
                isOpen={openForm} 
                onClose={() => setOpenForm(false)} 
                onSubmit={(newNom, newPrenoms, newIdentifiant) => updateProf(profId, newNom, newPrenoms, newIdentifiant)}
                nomProf={nomProf}
                setNomProf={setNomProf}
                prenomsProf={prenomsProf}
                setPrenomsProf={setPrenomsProf}
                identifiant={identifiant}
                setIdentifiant={setIdentifiant}
                />

                <AddModal 
                isOpen={openAddForm} 
                onClose={() => setOpenAddForm(false)} 
                onSubmit={(newNom, newPrenoms, newIdentifiant) => AddProf(newNom, newPrenoms, newIdentifiant)} 
                />


            </div>
        </>
    )
}

function EditModal({ isOpen, onClose, onSubmit, nomProf, setNomProf, prenomsProf, setPrenomsProf, identifiant, setIdentifiant }) {
    if (!isOpen) return null;
  
    return (
      <div className="modal fixed inset-0 flex items-center justify-center z-1">
        <div className="bg-white rounded-lg shadow-lg p-6 w-100">
          <h1 className="text-lg font-semibold text-center mb-4 text-gray-800">
            Modification d'un professeur
          </h1>
  
          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(nomProf,prenomsProf,identifiant);
          }}>
            <label className="block text-gray-800 me-4 mb-3" htmlFor="nomProfesseur">Nom :</label>
            <input 
              value={nomProf}
              onChange={(e) => setNomProf(e.target.value)}
              className="me-4 mb-4 w-full px-3 py-1 text-gray-800 outline-0 border
              border-gray-400  shadow rounded
              focus:shadow focus:shadow-emerald-600" 
              name="nomProfesseur" 
              type="text" 
            />
            <label className="block text-gray-800 me-4 mb-3" htmlFor="prenomsProfesseur">Prénoms :</label>
            <input 
              value={prenomsProf}
              onChange={(e) => setPrenomsProf(e.target.value)}
              className="me-4 mb-4 w-full px-3 py-1 text-gray-800 outline-0 border
              border-gray-400  shadow rounded
              focus:shadow focus:shadow-emerald-600" 
              name="prenomsProfesseur" 
              type="text" 
            />

            <label className="block text-gray-800 me-4 mb-3" htmlFor="identifiant">Identifiant :</label>
            <input 
              value={identifiant}
              onChange={(e) => setIdentifiant(e.target.value)}
              className="me-4 mb-4 w-full px-3 py-1 text-gray-800 outline-0 border
              border-gray-400  shadow rounded
              focus:shadow focus:shadow-emerald-600" 
              name="identifiant" 
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

  const [nomProf, setNomProf] = useState('');
  const [prenomsProf, setPrenomsProf] = useState('');
  const [identifiant, setIdentifiant] = useState('')
  if (!isOpen) return null;
  
  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-1">
      <div className="bg-white rounded-lg shadow-lg p-6 w-100">
        <h1 className="text-lg font-semibold text-center mb-4 text-gray-800">
          Ajout d'une salle
        </h1>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(nomProf, prenomsProf, identifiant);
        }}>
            <label className="block text-gray-800 me-4 mb-3" htmlFor="nomProfesseur">Nom :</label>
            <input 
              value={nomProf}
              onChange={(e) => setNomProf(e.target.value)}
              className="me-4 mb-4 w-full px-3 py-1 text-gray-800 outline-0 border
              border-gray-400  shadow rounded
              focus:shadow focus:shadow-emerald-600" 
              name="nomProfesseur" 
              type="text" 
            />
            <label className="block text-gray-800 me-4 mb-3" htmlFor="prenomsProfesseur">Prénoms :</label>
            <input 
              value={prenomsProf}
              onChange={(e) => setPrenomsProf(e.target.value)}
              className="me-4 mb-4 w-full px-3 py-1 text-gray-800 outline-0 border
              border-gray-400  shadow rounded
              focus:shadow focus:shadow-emerald-600" 
              name="prenomsProfesseur" 
              type="text" 
            />
            <label className="block text-gray-800 me-4 mb-3" htmlFor="identifiant">Identifiant :</label>
            <input 
              value={identifiant}
              onChange={(e) => setIdentifiant(e.target.value)}
              className="me-4 mb-4 w-full px-3 py-1 text-gray-800 outline-0 border
              border-gray-400  shadow rounded
              focus:shadow focus:shadow-emerald-600" 
              name="identifiant" 
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
  