const niveauRouter = require('express').Router()
const pool = require('../databases/db')

niveauRouter.get('/', async(req, res)=>{
    try {
        const response = await pool.query('SELECT * FROM niveau')
        res.status(201).json(response.rows)
    } catch (error) {
        res.status(401).send(error)
    }
});

niveauRouter.post('/ajouter', async (req, res)=>{
    try {
        const {nomniveau} = req.body
        await pool.query('INSERT INTO niveau (nomniveau) VALUES ($1)', [nomniveau]);
        res.status(200).send('Insertion éffectuer');
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
});

niveauRouter.put('/modifier/:idNiveau', async(req, res)=>{
    try {
        const id = req.params.idNiveau
        const {nomniveau} = req.body
        await pool.query(`UPDATE niveau SET nomniveau = $1 WHERE idNiveau = ${id}`, [nomniveau])
        res.status(200).send('Modification éffectuer');
    } catch (error) {
        res.status(401).send(error)
    }
});

niveauRouter.delete('/supprimer/:idNiveau', async (req, res)=>{
    try {
        const id = req.params.idNiveau
        await pool.query(`DELETE FROM niveau WHERE idNiveau = ${id}`)
        res.status(201).send('Suppréssion éffectuer')
    } catch (error) {
        res.status(401).send(error)
    }
})

module.exports = niveauRouter