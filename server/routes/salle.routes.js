const salleRouter = require('express').Router()
const pool = require('../databases/db')

/*Liste des salles*/
salleRouter.get('/', async (req, res)=>{
    try {
        const response = await pool.query("SELECT * FROM salle")
        res.status(200).json(response.rows)
    } catch (error) {
        console.log(error)
    }
})

/*Liste des salles disponibles à une heure donner*/
salleRouter.get('/disponible/:heure', async (req, res)=>{
    try {
        const heure = req.params.heure
        /*const response = await pool.query("SELECT s.nomsalle from salle s LEFT OUTER JOIN emploidutemps e ON s.idsalle = e.idsalle WHERE e.idsalle IS NULL")*/
        const response = await pool.query(`SELECT s.nomsalle from salle s LEFT OUTER JOIN emploidutemps e ON s.idsalle = e.idsalle WHERE e.idsalle IS NULL AND e.heure = '${heure}' `)
        res.send(response.rows)
    } catch (error) {
        res.status(401).send(error)
    }
})

/*Ajour de salles*/
salleRouter.post('/ajouter', async (req, res)=>{
    try {
        const {nomsalle} = req.body
        await pool.query("INSERT INTO salle(nomsalle) VALUES ($1)", [nomsalle])
        res.status(201).json({message : 'Insertion éffectuer'})
    } catch (error) {
        res.status(401).json(error)
    }
})

/*Modification de salles*/
salleRouter.put('/modifier/:idsalle', async (req, res)=>{
    try {
        const id = req.params.idsalle
        const {nomsalle} = req.body
        await pool.query(`UPDATE salle SET nomsalle = $1 WHERE idsalle = ${id}`, [nomsalle])
        res.status(200).send(`La salle avec le numéro ${id} à été modifié avec succés !`)
    } catch (error) {
        res.send(error)
    }
})

/*Suppréssion de salles*/
salleRouter.delete('/supprimer/:idsalle', async (req, res)=>{
    try {
        const id = req.params.idsalle
        await pool.query(`DELETE FROM salle WHERE idsalle = ${id}`)
        res.status(200).send(`La salle ${id} a été supprimer avec succés !`)
    } catch (error) {
        res.send(error)
    }
})

module.exports = salleRouter