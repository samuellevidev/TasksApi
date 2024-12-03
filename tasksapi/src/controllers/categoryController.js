const CategoryModel = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;

    try {
        const categoryId = await CategoryModel.create(userId, name);
        res.status(201).json({ 
            message: 'Categoria criada com sucesso', 
            categoryId 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao criar categoria', 
            error: error.message 
        });
    }
};

exports.listCategories = async (req, res) => {
    const userId = req.user.id;

    try {
        const categories = await CategoryModel.findByUserId(userId);
        res.json(categories);
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao listar categorias', 
            error: error.message 
        });
    }
};

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.id;

    try {
        const [result] = await connection.promise().query(
            'UPDATE categories SET name = ? WHERE id = ? AND user_id = ?',
            [name, id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        res.json({ message: 'Categoria atualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao atualizar categoria', 
            error: error.message 
        });
    }
};

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const [result] = await connection.promise().query(
            'DELETE FROM categories WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        res.json({ message: 'Categoria excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao excluir categoria', 
            error: error.message 
        });
    }
};