const connection = require('../../config/database');

class TaskModel {
    static async create(taskData) {
        const [result] = await connection.promise().query(
            'INSERT INTO tasks SET ?', 
            taskData
        );
        return result.insertId;
    }

    static async findByUserId(userId, filters = {}) {
        let query = 'SELECT * FROM tasks WHERE user_id = ?';
        const params = [userId];

        if (filters.status) {
            query += ' AND status = ?';
            params.push(filters.status);
        }

        if (filters.categoryId) {
            query += ' AND category_id = ?';
            params.push(filters.categoryId);
        }

        const [tasks] = await connection.promise().query(query, params);
        return tasks;
    }
}

module.exports = TaskModel;