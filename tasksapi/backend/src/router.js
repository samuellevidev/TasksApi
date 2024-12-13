const express = require('express');

const router = express.Router();

const tasksController = require('./controllers/tasksController');
const tasksMiddleware = require('./middlewares/tasksMiddleware');
const usersController = require('./controllers/usersController');
const usersMiddleware = require('./middlewares/usersMiddleware');

router.get('/tasks', usersMiddleware.validateUser, tasksController.getAll);
router.get('/tasks/:status', usersMiddleware.validateUser, tasksController.getByStatus);
router.get('/tasks/:priority', usersMiddleware.validateUser, tasksController.getByPriority);
router.post('/tasks', usersMiddleware.validateUser, 
  tasksMiddleware.validateFieldTitle, 
  tasksMiddleware.validateFieldStatus,
  tasksMiddleware.validateFieldPriority, 
  tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id',
  tasksMiddleware.validateFieldTitle,
  tasksMiddleware.validateFieldStatus,
  tasksMiddleware.validateFieldPriority,
  tasksController.updateTask,
);
router.get('/users', usersMiddleware.validateUser, usersController.getAll);
router.post('/users',usersController.createUser);
router.post('/login', usersController.validateUser)
router.delete('/users/:id', usersController.deleteUser);
router.put('/users/:id', usersController.updateUser,);

module.exports = router;