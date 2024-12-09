const { default: mongoose } = require('mongoose')

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

// Remove uma Instituição
router.delete('/:id', async (req, res) => {

    const { id } = req.params;
    const institutionId = mongoose.Types.ObjectId.createFromHexString(id);

    try {

        // Verifica existência da Instituição pelo id
        const institution = await Instituicoes.findOne(
            {
                _id: institutionId
            }
        );

        if (institution) {
            await Instituicoes.deleteOne(
                {
                    _id: institution._id
                }
            );

            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

})

module.exports = router