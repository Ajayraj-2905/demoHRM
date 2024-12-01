const express = require('express')
const { getNatureOfCompliances, addNatureOfCompliance, deleteNatureOfCompliance, getNatureOfComplianceById, updateNatureOfCompliance } = require('../controllers/natureofcomController')

const router = express.Router()

router.get('/', getNatureOfCompliances)
router.get('/:id', getNatureOfComplianceById)
router.post('/', addNatureOfCompliance)
router.put('/:id', updateNatureOfCompliance)
router.delete('/:id', deleteNatureOfCompliance)

module.exports = router