const express = require('express')
const { getCategories, addCategory, deleteCategory, updateCategory, getCategoryById } = require('../controllers/categoryController')

const router = express.Router()

router.get('/', getCategories)
router.get('/:id', getCategoryById)
router.post('/', addCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router
