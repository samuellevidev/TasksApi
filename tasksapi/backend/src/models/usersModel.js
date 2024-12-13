const connection = require('../db/connection');

    const getAll = async () => {
        const [users] = await connection.execute('select * from users');
        return users
    }

    const createUser = async (user) => {
        const {name, email} = user

        const users = 'insert into users(name, email) values  (?, ?)';

        const [createdUser] = await connection.execute(users, [name, email]);
        return {insertId: createdUser.insertId};
    }

    const updateUser = async ( id,user ) => {
        const { name, email } = user;

        const users = 'update users set name = ?, email = ?  where id = ?';

        const [updatedUser] = await connection.execute(users, [name, email, id]);
        return updatedUser;
    }

    const deleteUser = async (id) => {

        const [deletedUser] = await connection.execute('delete from users where id = ?;', [id]);
        return deletedUser;
    }

    const validateUser = async (loginUser) => {
        const users = 'select * from users where name = ? and email = ?;'

        const [validatedUser] = await connection.execute(users, [loginUser.name, loginUser.email]);
        return validatedUser;

    }


module.exports = {
    getAll,
    createUser,
    updateUser,
    deleteUser,
    validateUser,
}