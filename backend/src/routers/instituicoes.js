// Rotas para o CRUD de Instituições
const express = require('express')
const router = new express.Router()
const Instituicoes = require('../models/Instituicoes')

// Lista todas as Instituições
router.get('/', async (req, res) => {

    const list = await Instituicoes.find({})
    res.status(200).send(list)

})

// Insere uma Instituição
router.post('/', async (req, res) => {

    try {
        await Instituicoes.create(req.body);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

})

module.exports = router