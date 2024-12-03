const connection = require('../../config/database');

class CategoryModel {
    static async create(userId, name) {
        const [result] = await connection.promise().query(
            'INSERT INTO categories (user_id, name) VALUES (?, ?)',
            [userId, name]
        );
        return result.insertId;
    }

    static async findByUserId(userId) {
        const [categories] = await connection.promise().query(
            'SELECT * FROM categories WHERE user_id = ?',
            [userId]
        );
        return categories;
    }
}

module.exports = CategoryModel;