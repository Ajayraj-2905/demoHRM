const express = require('express')
const { getSubcategories, addSubcategory, getSubCategoryById, deleteSubCategory, updateSubCategory } = require('../controllers/subcategoryController')

const router = express.Router()

router.get('/', getSubcategories)
router.get('/:id', getSubCategoryById)
router.post('/', addSubcategory)
router.put('/:id', updateSubCategory)
router.delete('/:id', deleteSubCategory)

module.exports = router
