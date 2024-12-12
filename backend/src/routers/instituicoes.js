const { default: mongoose } = require('mongoose')
const Joi = require('joi')

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

// Schema para validação dos dados de Instituição
const instituicaoSchema = Joi.object({
    nome: Joi.string().min(1).required().error(new Error('O Nome é inválido.')),
    uf: Joi.string().min(2).max(2).required().valid(
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ).error(new Error('A UF é inválida.')),
    qtdAlunos: Joi.number().integer().min(0).strict().required().error(new Error('A Quantidade de Alunos é inválida.')),
});

// Insere uma Instituição
router.post('/', async (req, res) => {
    const instituicao = req.body;

    // Validação dos dados da Instituição
    const validation = instituicaoSchema.validate(instituicao);

    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }

    // Verifica a existência de uma Instituição com o mesmo Nome
    const instituicaoNome = await Instituicoes.findOne(
        {
            nome: req.body.nome
        }
    );

    if (instituicaoNome) {
        // Verifica se a Instituição de mesmo Nome é da mesma UF
        if (instituicaoNome.uf === req.body.uf) {
            return res.status(409).send('Já existe uma Instituição com o mesmo Nome e UF.');
        }
    }

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
            const instituicaoEdit = req.body;

            // Validação dos novos dados da Instituição
            const validation = instituicaoSchema.validate(instituicaoEdit);
        
            if (validation.error) {
                return res.status(422).send(validation.error.message);
            }

            // Verifica a existência de uma Instituição com o mesmo Nome e UF
            const instituicaoNome = await Instituicoes.findOne(
                {
                    nome: req.body.nome,
                    uf: req.body.uf,
                }
            );

            if (instituicaoNome) {
                // Verifica se a Instituição de mesmo Nome não é ela mesma
                if (!(instituicaoNome._id.equals(instituicao._id))) {
                    return res.status(409).send('Já existe uma Instituição com o mesmo Nome e UF.');
                }
            }

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