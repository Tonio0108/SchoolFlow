const professeurRoutes = require('express').Router()
const pool = require('../databases/db')

/*Liste des professeurs*/
professeurRoutes.get('/', async(req, res)=>{
    try {
        const response = await pool.query('SELECT * FROM professeur')
        res.status(201).json(response.rows)
    } catch (error) {
        res.status(401).send(error)
    }
});

/*Ajout de professeur*/
professeurRoutes.post('/ajouter', async (req, res)=>{
    try {
        const {nomProfesseur, prenomsProfesseur} = req.body
        await pool.query('INSERT INTO professeur (nomprofesseur, prenomsprofesseur) VALUES ($1, $2)', [nomProfesseur, prenomsProfesseur]);
        res.status(200).send('Insertion éffectuer');
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
});

/*Modification de professeur*/
professeurRoutes.put('/modifier/:idProfesseur', async(req, res)=>{
    try {
        const id = req.params.idProfesseur
        const {nomProfesseur, prenomsProfesseur} = req.body
        await pool.query(`UPDATE professeur SET nomprofesseur = $1, prenomsprofesseur = $2 WHERE idprofesseur = ${id}`, [nomProfesseur, prenomsProfesseur])
        res.status(200).send('Modification éffectuer');
    } catch (error) {
        res.status(401).send(error)
    }
});

/*Suppréssion de professeur*/
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