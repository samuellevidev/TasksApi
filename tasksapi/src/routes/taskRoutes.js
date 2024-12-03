const express = require('express');
const { createTask, listTasks } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.post('/', createTask);
router.get('/', listTasks);

module.exports = router;