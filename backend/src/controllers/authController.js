const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')

exports.register = async (req, res) => {
  const { username, email, password } = req.body
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' })
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword], (err) => {
        if (err) return res.status(500).json({ error: 'Database error' })
        res.status(201).json({ message: 'User registered successfully' })
      })
  })
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' })
    if (result.length === 0) return res.status(400).json({ message: 'User not found' })

    const user = result[0]
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' })

    const token = jwt.sign({ id: user.id }, 'jwt-secret-key', { expiresIn: '5m' })
    res.status(200).json({ Login: true, token, user })
  })
}

