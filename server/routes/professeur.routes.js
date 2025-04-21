const professeurRoutes = require('express').Router()
const pool = require('../databases/db')

professeurRoutes.get('/', async(req, res)=>{
    try {
        const response = await pool.query('SELECT * FROM professeur')
        res.status(201).json(response.rows)
    } catch (error) {
        res.status(401).send(error)
    }
});

professeurRoutes.post('/ajouter', async (req, res)=>{
    try {
        const {nomProfesseur, prenomsProfesseur, gradeProfesseur} = req.body
        await pool.query('INSERT INTO professeur (nomprofesseur, prenomsprofesseur, gradeprofesseur) VALUES ($1, $2, $3)', [nomProfesseur, prenomsProfesseur, gradeProfesseur]);
        res.status(200).send('Insertion éffectuer');
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
});

professeurRoutes.put('/modifier/:idProfesseur', async(req, res)=>{
    try {
        const id = req.params.idProfesseur
        const {nomProfesseur, prenomsProfesseur, gradeProfesseur} = req.body
        await pool.query(`UPDATE professeur SET nomprofesseur = $1, prenomsprofesseur = $2, gradeProfesseur = $3 WHERE idprofesseur = ${id}`, [nomProfesseur, prenomsProfesseur, gradeProfesseur])
        res.status(200).send('Modification éffectuer');
    } catch (error) {
        res.status(401).send(error)
    }
});

professeurRoutes.delete('/supprimer/:idProfesseur', async (req, res)=>{
    try {
        const id = req.params.idProfesseur
        await pool.query(`DELETE FROM professeur WHERE idprofesseur = ${id}`)
        res.status(201).send('Suppréssion éffectuer')
    } catch (error) {
        res.status(401).send(error)
    }
})

module.exports = professeurRoutes