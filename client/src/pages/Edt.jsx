import { useEffect, useState } from "react";
import Confirm from "../components/Confirm";
import Error from "../components/Error";
import Success from "../components/Success";

export default function Edt(){

    const [ openAddForm, setOpenAddForm ] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openModalSuccess, setOpenModalSuccess] = useState(false)
    const [openModalError, setOpenModalError] = useState(false)
    const [openModalUpdateSuccess, setOpenModalUpdateSuccess] = useState(false)
    const [openModalUpdateError, setOpenModalUpdateError] = useState(false)
    const [ edt, setEdt ] = useState([])
    const [ classes, setClasses ] = useState([])
    const [selectedClasse, setSelectedClasse] = useState('');

    const fetchClasses = () => {
      fetch('http://localhost:3000/niveau')
        .then(res => res.json())
        .then(data => setClasses(data))
        .catch(err => console.error(err));
    };
    
    useEffect(() => {
    fetchClasses();
    }, []);

    const fetchEdt = (id) => {
      fetch(`http://localhost:3000/emploiDutemps/parniveau/${id}`)
        .then(res => res.json())
        .then(data => setEdt(data))
        .catch(err => console.error(err));
    }
    
    useEffect(() => {
      if (selectedClasse) {
        fetchEdt(selectedClasse);
      }
    }, [selectedClasse]);


    const AddEdt = (idMatiere, idSalle, idNiveau, enseignant, date, heure) => {
          fetch(`http://localhost:3000/emploiDutemps/ajouter`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idMatiere, idSalle, idNiveau, enseignant, date, heure }),
          })
            .then(res => {
              if (!res.ok) throw new Error('Erreur lors de la creation');
              return res.text();
            })
            .then(data => {
              console.log('Edt ajouté:', data);
              setOpenAddForm(false);
              setOpenModalUpdateSuccess(true);
              fetchEdt()
            })
            .catch( () => setOpenModalUpdateError(true));
        };

        const Destroy = (id) => {
            fetch(`http://localhost:3000/emploiDutemps/supprimer/${id}`, {
                method: 'DELETE'
            })
                .then(res => {
                if (!res.ok) throw new Error('Erreur lors de la suppression');
                return res.text();
                })
                .then(() => {
                fetchEdt(); // Recharge les données
                setOpenModal(false)
                setOpenModalSuccess(true)
                })
                .catch((err) => {
                console.error('Erreur:', err)
                  setOpenModalError(true)
                });
            };
    return(
        <>
            <div className="flex justify-center h-full w-full p-3">
                <div className="w-full my-auto h-6/7 text-center p-3">
                    <div className="flex flex-col h-full">
                        <h1 className="mb-3 font-semibold text-lg">Gestion des emplois du temps</h1>
                        <div className="flex flex-col">
                            <h1>Emploi du temps du : 5 Mai - 10 Mai 2025</h1>
                            <select
                              value={selectedClasse}
                              onChange={(e) => {
                                setSelectedClasse(e.target.value)
                                fetchEdt(e.target.value)
                              }}
                              className=" text-center outline-0 mb-3 mt-3 px-2 py-1 border border-gray-400 rounded w-30 mx-auto
                              focus:shadow focus:shadow-emerald-600"
                            >
                              <option value="">Selectionner une classes</option>
                              {classes.map(cl => (
                                <option key={cl.idniveau} value={cl.idniveau}>
                                  {cl.nomniveau}
                                </option>
                              ))}
                            </select>

                            <table className=" mt-3 text-sm border border-gray-400">
                                <thead>
                                    <tr>
                                        <th className="border-e border-gray-400">-</th>
                                        <th className="border-e border-gray-400">8h-10h</th>
                                        <th className="border-e border-gray-400">10h-12h</th>
                                        <th className="border-e border-gray-400">14-16h</th>
                                        <th>16h-18h</th>
                                    </tr>

                                </thead>
                                <tbody>
                                <tr>
                                  <th className="border-e border-gray-400">Lun</th>

                                  {/* 8h */}
                                  <td className="border-e border-gray-300">
                                    {edt && edt.length > 0 ? (
                                      edt
                                        .filter(item => item.heure === '08:00')
                                        .map((item, index) => (
                                          <div key={index}>
                                            <p>{item.nommatiere}</p>
                                            <p>{item.nomsalle}</p>
                                            <p>{item.identifiant}</p>
                                          </div>
                                        ))
                                    ) : (
                                      <p>Aucune donnée</p>
                                    )}
                                  </td>

                                  {/* 10h */}
                                  <td className="border-e border-gray-300">
                                    {edt && edt.length > 0 ? (
                                      edt
                                        .filter(item => item.heure === '10:00')
                                        .map((item, index) => (
                                          <div key={index}>
                                            <p>{item.nommatiere}</p>
                                            <p>{item.nomsalle}</p>
                                            <p>{item.identifiant}</p>
                                          </div>
                                        ))
                                    ) : (
                                      <p>Aucune donnée</p>
                                    )}
                                  </td>

                                  {/* 14h */}
                                  <td className="border-e border-gray-300">
                                    {edt && edt.length > 0 ? (
                                      edt
                                        .filter(item => item.heure === '14:00')
                                        .map((item, index) => (
                                          <div key={index}>
                                            <p>{item.nommatiere}</p>
                                            <p>{item.nomsalle}</p>
                                            <p>{item.identifiant}</p>
                                          </div>
                                        ))
                                    ) : (
                                      <p>Aucune donnée</p>
                                    )}
                                  </td>

                                  {/* 16h */}
                                  <td>
                                    {edt && edt.length > 0 ? (
                                      edt
                                        .filter(item => item.heure === '16:00')
                                        .map((item, index) => (
                                          <div key={index}>
                                            <p>{item.nommatiere}</p>
                                            <p>{item.nomsalle}</p>
                                            <p>{item.identifiant}</p>
                                          </div>
                                        ))
                                    ) : (
                                      <p>Aucune donnée</p>
                                    )}
                                  </td>
                                </tr>

                                </tbody>

                            </table>
                            <div className="w-full flex justify-center items-center mt-5">
                                  <button
                                    onClick={() => {
                                        setOpenAddForm(true)
                                      }}
                                   className=" px-2 py-1 bg-emerald-600 rounded text-white
                                 hover:bg-emerald-700 hover:cursor-pointer transition ms-5">
                                      <i className="bi bi-plus text-lg"></i>
                                      Ajouter un horaire
                                  </button>
                                <button className="self-start px-2 py-1 bg-emerald-600 rounded
                                text-white
                                hover:bg-emerald-700 hover:cursor-pointer transition ms-5">
                                    Imprimer l'emploi du temps de cette semaine
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                <Confirm 
                    isOpen={openModal} 
                    title={'Suppression'} 
                    message={'Voulez vous vraiment supprimer cette matière ?'}
                    onClose={() => setOpenModal(false)}
                    onConfirm={() => Destroy(edtId)} />
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

            <AddModal 
                isOpen={openAddForm}
                onClose={() => setOpenAddForm(false)}
                onSubmit={(newMatiere, newSalle, newClasse, newProf, newDate, newHeure) => AddEdt(newMatiere, newSalle, newClasse, newProf, newDate, newHeure)} 
            />
        </>
    )
}

function AddModal({ isOpen, onClose, onSubmit}) {
  const [ classes, setClasses ] = useState([])
  const [ salles, setSalles ] = useState([])
  const [ profs, setProfs ] = useState([])
  const [ matieres, setMatieres ] = useState([])
  const [ classe, setClasse ] = useState('')
  const [ salle, setSalle ] = useState('')
  const [ prof, setProf ] = useState('')
  const [ date, setDate ] = useState('')
  const [ heure, setHeure ] = useState('')
  const [ matiere, setMatiere ] = useState()


  const fetchProfs = () => {
    fetch('http://localhost:3000/professeur')
      .then(res => res.json())
      .then(data => setProfs(data))
      .catch(err => console.error(err))
  };

    useEffect(() => {
    fetchProfs()
    }, [])

    const fetchSalles = () => {
      fetch('http://localhost:3000/salle')
        .then(res => res.json())
        .then(data => setSalles(data))
        .catch(err => console.error(err));
    };
    
    useEffect(() => {
    fetchSalles();
    }, []);

    const fetchMatieres = () => {
      fetch('http://localhost:3000/matiere')
        .then(res => res.json())
        .then(data => setMatieres(data))
        .catch(err => console.error(err));
    }
    
    useEffect(() => {
    fetchMatieres();
    }, []);

    const fetchClasses = () => {
      fetch('http://localhost:3000/niveau')
        .then(res => res.json())
        .then(data => setClasses(data))
        .catch(err => console.error(err));
    };
    
    useEffect(() => {
    fetchClasses();
    }, []);

  if (!isOpen) return null;
  
  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-1">
      <div className="bg-white rounded-lg shadow-lg p-6 w-100">
        <h1 className="text-lg font-semibold text-center mb-4 text-gray-800">
          Creation d' horaire
        </h1>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(matiere, salle, classe, prof, date, heure);
        }}>

          <label className="block text-gray-800 me-4 mb-3" htmlFor="date">Date :</label>
          <input 
          value={date}
            className="me-4 mb-4 w-full px-3 py-1 text-gray-800 outline-0 border
            border-gray-400  shadow rounded
            focus:shadow focus:shadow-emerald-600" 
            onChange={(e) => setDate(e.target.value)}
            name="date" 
            type="date" 
          />

          <label className="block text-gray-800 me-4 mb-3" htmlFor="heure">heure :</label>
          <input 
            value={heure}
            onChange={(e) => setHeure(e.target.value)}
            className="me-4 mb-4 w-full px-3 py-1 text-gray-800 outline-0 border
            border-gray-400  shadow rounded
            focus:shadow focus:shadow-emerald-600" 
            name="heure" 
            type="time" 
          />
          <label className="block text-gray-800 me-4 mb-3" htmlFor="classe">Classe :</label>
          <select 
            name="classe"
            value={classe}
            onChange={(e) => setClasse(e.target.value)}
            className="me-4 mb-4 w-full px-3 py-1 text-gray-800 outline-0 border
            border-gray-400 shadow rounded
            focus:shadow focus:shadow-emerald-600"
          >
            <option value="">Choisir une classe</option>
            {
              classes.map((classe) => (
                <option key={classe.idniveau} value={classe.idniveau}>
                  {classe.nomniveau}
                </option>
              ))
            }
          </select>

          <label className="block text-gray-800 me-4 mb-3" htmlFor="matiere">Matiere :</label>
          <select 
            name="matiere"
            value={matiere}
            onChange={(e) => setMatiere(e.target.value)}
            className="me-4 mb-4 w-full px-3 py-1 text-gray-800 outline-0 border
            border-gray-400 shadow rounded
            focus:shadow focus:shadow-emerald-600"
          >
            <option value="">Choisir une matière</option>
            {
              matieres.map((matiere) => (
                <option key={matiere.idmatiere} value={matiere.idmatiere}>
                  {matiere.nommatiere}
                </option>
              ))
            }
          </select>

          <label className="block text-gray-800 me-4 mb-3" htmlFor="salle">Salle :</label>
          <select 
            name="salle"
            value={salle}
            onChange={(e) => setSalle(e.target.value)}
            className="me-4 mb-4 w-full px-3 py-1 text-gray-800 outline-0 border
            border-gray-400 shadow rounded
            focus:shadow focus:shadow-emerald-600"
          >
            <option value="">Choisir une salle</option>
            {
              salles.map((salle) => (
                <option key={salle.idsalle} value={salle.idsalle}>
                  {salle.nomsalle}
                </option>
              ))
            }
          </select>
          <label className="block text-gray-800 me-4 mb-3" htmlFor="prof">Professeur :</label>
          <select 
            name="prof"
            value={prof}
            onChange={(e) => setProf(e.target.value)}
            className="me-4 mb-4 w-full px-3 py-1 text-gray-800 outline-0 border
            border-gray-400 shadow rounded
            focus:shadow focus:shadow-emerald-600"
          >
            <option value="">Choisir un enseignant</option>
            {
              profs.map((prof) => (
                <option key={prof.idprofesseur} value={prof.idprofesseur}>
                  {prof.identifiant}
                </option>
              ))
            }
          </select>

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
