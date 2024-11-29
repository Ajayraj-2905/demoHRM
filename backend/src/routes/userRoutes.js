const express = require('express')
const upload = require('../multerConfig')
const { addUser, getUsers, getUserById, deleteUser, updateUser } = require('../controllers/userController')

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.put('/upload/:id', upload.single('image'), updateUser)
router.post('/upload', upload.single('image'), addUser)
router.delete('/:id', deleteUser)

module.exports = router