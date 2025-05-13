const matiereRouter = require('express').Router()
const pool = require('../databases/db')

/*Liste des matiere*/
matiereRouter.get('/', async(req, res)=>{
    try {
        const response = await pool.query('SELECT * FROM matiere')
        res.status(201).json(response.rows)
    } catch (error) {
        res.status(401).send(error)
    }
});

/*Ajouts des matiere*/
matiereRouter.post('/ajouter', async (req, res)=>{
    try {
        const {nomMatiere,enseignant} = req.body
        await pool.query('INSERT INTO matiere (nommatiere,enseignant) VALUES ($1, $2)', [nomMatiere,enseignant]);
        res.status(200).send('Insertion éffectué');
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
});

matiereRouter.put('/modifier/:idMatiere', async (req, res) => {
    try {
      const { idMatiere } = req.params;
      const { nomMatiere, enseignant } = req.body;
  
      await pool.query(
        'UPDATE matiere SET nommatiere = $1, enseignant = $2 WHERE idmatiere = $3',
        [nomMatiere,enseignant, idMatiere]
      );
  
      res.status(200).send('Modification effectuée');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la modification');
    }
  });
  

/*Suppression des matiere*/
matiereRouter.delete('/supprimer/:idMatiere', async (req, res)=>{
    try {
        const id = req.params.idMatiere
        await pool.query(`DELETE FROM matiere WHERE idmatiere = ${id}`)
        res.status(200).send('Suppréssion éffectué')
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = matiereRouter