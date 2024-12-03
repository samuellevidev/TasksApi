const connection = require('../../config/database');

exports.createTask = async (req, res) => {
    const { title, description, due_date, category_id, status, priority } = req.body;
    const user_id = req.user.id;

    try {
        const [result] = await connection.promise().query(
            'INSERT INTO tasks (user_id, title, description, due_date, category_id, status, priority) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [user_id, title, description, due_date, category_id, status, priority]
        );

        res.status(201).json({ 
            message: 'Tarefa criada com sucesso', 
            taskId: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar tarefa', error: error.message });
    }
};

exports.listTasks = async (req, res) => {
    const user_id = req.user.id;
    const { status, category_id } = req.query;

    try {
        let query = 'SELECT * FROM tasks WHERE user_id = ?';
        let params = [user_id];

        if (status) {
            query += ' AND status = ?';
            params.push(status);
        }

        if (category_id) {
            query += ' AND category_id = ?';
            params.push(category_id);
        }

        const [tasks] = await connection.promise().query(query, params);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar tarefas', error: error.message });
    }
};