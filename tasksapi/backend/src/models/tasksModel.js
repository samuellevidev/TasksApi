const connection = require('../db/connection');

  const getAll = async (userId) => {
    const query = 'SELECT * FROM tasks WHERE id_user = ?'
    const [tasks] = await connection.execute(query, [userId]);
    return tasks;
  };

  const getByStatus = async (param,userId) => {
    const query = 'SELECT * FROM tasks WHERE status = ? AND id_user = ?'
    const [tasks] = await connection.execute(query, [param, userId])
    return tasks;
  }

  const getByPriority = async (param, userId) => {
    const query = 'SELECT * FROM tasks WHERE priority = ? AND id_user = ?'
    const [tasks] = await connection.execute(query, [param, userId])
    return tasks;
  }


  const createTask = async (task, userId) => {
    const { title, status, priority } = task;
    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO tasks(title, status, priority, created_at, id_user) VALUES (?, ?, ?, ?, ?)';

    const [createdTask] = await connection.execute(query, [title, status, priority , dateUTC, userId]);
    return {insertId: createdTask.insertId};
  };

  const updateTask = async (id, task) => {
    const { title, status, priority } = task;
    
    const query = 'UPDATE tasks SET title = ?, status = ?, priority = ? WHERE id = ?';

    const [updatedTask] = await connection.execute(query, [title, status, priority, id]);
    return updatedTask;
  };

  const deleteTask = async (id) => {
    const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;
  };


module.exports = {
  getAll,
  getByStatus,
  getByPriority,
  createTask,
  deleteTask,
  updateTask,
};
