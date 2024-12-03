const { body, validationResult } = require('express-validator');

const validateUser = [
    body('username').trim().isLength({ min: 3 }).withMessage('Username deve ter pelo menos 3 caracteres'),
    body('email').trim().isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateTask = [
    body('title').trim().notEmpty().withMessage('Título é obrigatório'),
    body('status').isIn(['pendente', 'em_progresso', 'concluida']).withMessage('Status inválido'),
    body('priority').isIn(['baixa', 'media', 'alta']).withMessage('Prioridade inválida'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateUser,
    validateTask
};