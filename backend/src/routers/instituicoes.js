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

// Retorna cálculo agregado para o gráfico 
router.get('/chart', async (req, res) => { 
 
    const chart = await Instituicoes.aggregate([{$group: { _id: "$uf", totalQuantity: { $sum: "$qtdAlunos" } }}, {$sort: { totalQuantity: -1 }}]) 
    res.status(200).send(chart)
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

// Atualiza uma Instituição
router.put('/:id', async (req, res) => {

    const { id } = req.params;
    const instituicaoId = mongoose.Types.ObjectId.createFromHexString(id);

    try {
        // Verifica existência da Instituição pelo id
        const instituicao = await Instituicoes.findOne(
            {
                _id: instituicaoId
            }
        );

        if (instituicao) {
            await Instituicoes.updateOne(
                {
                    _id: instituicao._id
                },
                {
                    $set: req.body
                }
            );

            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

})

// Remove uma Instituição
router.delete('/:id', async (req, res) => {

    const { id } = req.params;
    const instituicaoId = mongoose.Types.ObjectId.createFromHexString(id);

    try {
        // Verifica existência da Instituição pelo id
        const instituicao = await Instituicoes.findOne(
            {
                _id: instituicaoId
            }
        );

        if (instituicao) {
            await Instituicoes.deleteOne(
                {
                    _id: instituicao._id
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