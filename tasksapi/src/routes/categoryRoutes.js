const express = require('express');
const { 
    createCategory, 
    listCategories, 
    updateCategory, 
    deleteCategory 
} = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.post('/', createCategory);
router.get('/', listCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;