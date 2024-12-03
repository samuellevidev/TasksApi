// Controlador de Usuários (src/controllers/userController.js)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../../config/database');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await connection.promise().query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ 
            message: 'Usuário registrado com sucesso', 
            userId: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await connection.promise().query(
            'SELECT * FROM users WHERE email = ?', 
            [email]
        );

        if (users.length === 0) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ 
            token, 
            user: { id: user.id, username: user.username, email: user.email } 
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro no login', error: error.message });
    }
};
