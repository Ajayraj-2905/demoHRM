const db = require('../db')
const bcrypt = require('bcryptjs')

// Get user reports
exports.getUsers = (req, res) => {
    db.query('SELECT * FROM usermanagement', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' })
        res.json(results)
    })
}

// Get a single user record
exports.getUserById = (req, res) => {
    const usernameId = req.params.id
    db.query('SELECT * FROM usermanagement WHERE id = ?', [usernameId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' })
        if (results.length === 0) return res.status(404).json({ message: 'User not found' })
        res.json(results[0])
    })
}

// Add user reports
exports.addUser = async (req, res) => {
    try {
        const { username, email, password, designation, companyAccess, moduleAccess } = req.body
        const image = req.file ? req.file.filename : null
        const sql = `
            INSERT INTO usermanagement (username, email, password, designation, company_access, module_access, profile_photo)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `
        const hashedPassword = await bcrypt.hash(password, 10)
        const values = [username, email, hashedPassword, designation, companyAccess, moduleAccess, image]
        db.execute(sql, values)
        res.status(201).send({ Message: 'User created successfully!' })
    } catch (error) {
        console.error(error)
        res.status(500).send({ Error: 'Database error while uploading user data' })
    }
}

// Update user records
exports.updateUser = async (req, res) => {
    const usernameId = req.params;
    const { username, email, password, designation, companyAccess, modulesAccess } = req.body
    const image = req.file ? req.file.filename : null
    console.log(image, req.file)

    if (!username || !email || !password || !designation || !companyAccess || !modulesAccess) {
        return res.status(400).json({ message: 'All fields are required except profile photo' });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const sql = `UPDATE usermanagement SET username = ?, email = ?, password = ?, 
                designation = ?, company_access = ?, module_access = ? 
                ${image ? ', profile_photo = ?' : ''} WHERE id = ?`;
    const values = [username, email, hashedPassword, designation, companyAccess, modulesAccess]
    if (image) {
        values.push(image)
        values.push(usernameId.id)
    } else {
        values.push(usernameId.id)
    }
    console.log(values)
    db.query(sql, values, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' })
        if (results.affectedRows === 0) return res.status(404).json({ message: 'User not found' })
        res.status(200).json({ message: 'User updated successfully' })
    })
}

// Delete user records
exports.deleteUser = (req, res) => {
    const usernameId = req.params.id
    db.query('DELETE FROM usermanagement WHERE id = ?', [usernameId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Internal server error' })
        if (results.affectedRows === 0) return res.status(404).json({ message: 'User not found' })
        res.status(200).json({ message: 'User deleted successfully' })
    })
}
