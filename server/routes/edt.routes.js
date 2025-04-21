const edtRouter = require('express').Router()
const pool = require('../databases/db')

edtRouter.get('/', async(req, res)=>{
    try {
        const response = await pool.query('SELECT * FROM emploidutemps')
        res.status(201).json(response.rows)
    } catch (error) {
        res.status(401).send(error)
    }
});

edtRouter.post('/ajouter', async (req, res)=>{
    try {
        const {idMatiere, idSalle, idNiveau, idProfesseur, date, heure} = req.body
        await pool.query('INSERT INTO emploidutemps (idmatiere, idsalle, idniveau, idprofesseur, date, heure) VALUES ($1, $2, $3, $4, $5, $6)', [idMatiere, idSalle, idNiveau, idProfesseur, date, heure]);
        res.status(200).send('Insertion éffectuer');
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
});

edtRouter.put('/modifier/:idEmploi', async(req, res)=>{
    try {
        const id = req.params.idEmploi
        const {idMatiere, idSalle, idNiveau, idProfesseur, date, heure} = req.body
        await pool.query(`UPDATE emploidutemps SET idmatiere = $1, idsalle = $2, idniveau = $3, idprofesseur = $4, date = $5, heure = $6 WHERE idprofesseur = ${id}`, [idMatiere, idSalle, idNiveau, idProfesseur, date, heure])
        res.status(200).send('Modification éffectuer');
    } catch (error) {
        res.status(401).json(error)
    }
});

edtRouter.delete('/supprimer/:idEmploi', async (req, res)=>{
    try {
        const id = req.params.idEmploi
        await pool.query(`DELETE FROM emploidutemps WHERE idEmploi = ${id}`)
        res.status(201).send('Suppréssion éffectuer')
    } catch (error) {
        res.status(401).send(error)
    }
})

module.exports = edtRouter