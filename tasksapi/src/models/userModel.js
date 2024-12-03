const connection = require('../../config/database');

class UserModel {
    static async findByEmail(email) {
        const [users] = await connection.promise().query(
            'SELECT * FROM users WHERE email = ?', 
            [email]
        );
        return users[0];
    }

    static async create(username, email, hashedPassword) {
        const [result] = await connection.promise().query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        return result.insertId;
    }
}

module.exports = UserModel;