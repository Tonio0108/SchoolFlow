const matiereRouter = require('express').Router()
const pool = require('../databases/db')

matiereRouter.get('/', async(req, res)=>{
    try {
        const response = await pool.query('SELECT * FROM matiere')
        res.status(201).json(response.rows)
    } catch (error) {
        res.status(401).send(error)
    }
});

matiereRouter.post('/ajouter', async (req, res)=>{
    try {
        const {nomMatiere} = req.body
        await pool.query('INSERT INTO matiere (nommatiere) VALUES ($1)', [nomMatiere]);
        res.status(200).send('Insertion éffectuée');
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
});

matiereRouter.put('/modifier/:idMatiere', async(req, res)=>{
    try {
        const id = req.params.idMatiere
        const {nomMatiere} = req.body
        await pool.query(`UPDATE matiere SET nommatiere = $1 WHERE idmatiere = ${id}`, [nomMatiere])
        res.status(200).send('Modification éffectuer');
    } catch (error) {
        res.status(401).send(error)
    }
});

matiereRouter.delete('/supprimer/:idMatiere', async (req, res)=>{
    try {
        const id = req.params.idMatiere
        await pool.query(`DELETE FROM matiere WHERE idmatiere = ${id}`)
        res.status(201).send('Suppréssion éffectuer')
    } catch (error) {
        res.status(401).send(error)
    }
})

module.exports = matiereRouter