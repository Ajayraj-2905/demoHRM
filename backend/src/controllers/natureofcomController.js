const db = require('../db')

// Get compliances records
exports.getNatureOfCompliances = (req, res) => {
    db.query('SELECT * FROM natureofcompliance', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' })
        res.json(results)
    })
}

// Get a single compliance record
exports.getNatureOfComplianceById = (req, res) => {
    const complianceId = req.params.id
    db.query('SELECT * FROM natureofcompliance WHERE id = ?', [complianceId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' })
        if (results.length === 0) return res.status(404).json({ message: 'NatureOfCompliance not found' })
        res.json(results[0])
    })
}

// Add compliance record
exports.addNatureOfCompliance = (req, res) => {
    const { compliance } = req.body
    if (!compliance) return res.status(400).json({ message: 'NatureOfCompliance name is required' })

    db.query('INSERT INTO natureofcompliance (nature_of_compliance) VALUES (?)', [compliance], (err) => {
        if (err) return res.status(500).json({ error: 'Database error' })
        res.status(201).json({ message: 'NatureOfCompliance added successfully' })
    })
}

// Update category records
exports.updateNatureOfCompliance = (req, res) => {
    const complianceId = req.params.id
    const { compliance } = req.body
    if (!compliance) {
        return res.status(400).json({ message: 'NatureOfCompliance name is required' })
    }

    const query = 'UPDATE natureofcompliance SET nature_of_compliance = ? WHERE id = ?'
    db.query(query, [compliance, complianceId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' })
        if (results.affectedRows === 0) return res.status(404).json({ message: 'NatureOfCompliance not found' })
        res.status(200).json({ message: 'NatureOfCompliance updated successfully' })
    })
}

// Delete compliance records
exports.deleteNatureOfCompliance = (req, res) => {
    const activityId = req.params.id
    db.query('DELETE FROM natureofcompliance WHERE id = ?', [activityId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Internal server error' })
        if (results.affectedRows === 0) return res.status(404).json({ message: 'NatureOfCompliance not found' })
        res.status(200).json({ message: 'NatureOfCompliance deleted successfully' })
    })
}