const usersModel = require('../models/usersModel')
const jwt = require('jsonwebtoken')

    const getAll = async (_request, response) => {
        const users = await usersModel.getAll()
        return response.status(200).json(users);
    };

    const createUser = async (request, response) => {
        const createdUser = await usersModel.createUser(request.body);
        return response.status(201).json(createdUser);
    };

    const deleteUser = async (request, response) =>  {
        const { id } = request.params;

        await usersModel.deleteUser(id);
        return response.status(204).json();
    };

    const updateUser = async (request, response) =>  {
        const { id } = request.params;

        await usersModel.updateUser(id, request.body);
        return response.status(204).json();
    };

    const validateUser = async (req, res) => {

        const response = usersModel.validateUser(req.body)

        response.then((user) => {
            if(user == "") {
                return res.status(404).json("Usuário não encontrado 0-0")
            }
    
            const secret = process.env.jwtSecret
            const token = jwt.sign({ id: user[0].id }, secret, { expiresIn: 2000 })
            res.status(200).json({ user, token })
        })
        .catch((error) => res.status(400).json(error.message))
    }

module.exports = {
    getAll,
    createUser,
    deleteUser,
    updateUser,
    validateUser,
}