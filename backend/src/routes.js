const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('./db')
const { deleteCategory } = require('./controllers/categoryController')

const router = express.Router()

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })

    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword], (err) => {
        if (err) return res.status(500).json({ message: 'Database error' })
        res.status(201).json({ message: 'User registered successfully' })
      })
  })
})

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    if (result.length === 0) {
      return res.status(400).json({ message: 'User not found' })
    }
    const user = result[0]
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' })
    }
    const id = user.id
    const token = jwt.sign({ id }, 'jwt-secret-key', { expiresIn: '5m' })
    return res.status(200).json({ Login: true, token, user })
  })
})

// Get compliance records
router.get('/natureofcompliance', (req, res) => {
  db.query('SELECT * FROM natureofcompliance', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    res.json(results)
  })
})

// Add compliance record
router.post('/natureofcompliance', (req, res) => {
  const { compliance } = req.body
  if (!compliance) return res.status(400).json({ message: 'Compliance name is required' })

  db.query('INSERT INTO natureofcompliance (activity_name) VALUES (?)', [compliance], (err) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    res.status(201).json({ message: 'Compliance added successfully' })
  })
})

// Get category records
router.get('/category', (req, res) => {
  db.query('SELECT * FROM category', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    res.json(results)
  })
})

// Add category record
router.post('/category', (req, res) => {
  const { category } = req.body
  if (!category) {
    return res.status(400).json({ error: 'Category is required' })
  }
  const sql = "INSERT INTO category (category_name) VALUES (?)"
  db.query(sql, [category], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Database error' })
    }
    res.status(201).json({ message: 'Category created successfully' })
  })
})

// Delete category records
router.delete('/category/:id', (req, res) => {
  const categoryId = req.params.id;
  console.log(`Deleting category with ID: ${categoryId}`);

  const query = 'DELETE FROM category WHERE category_id = ?';
  db.query(query, [categoryId], (err, results) => {
    if (err) {
      console.error('Error deleting category:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json({ message: 'Category deleted successfully' });
    }
  });
});


// Add subcategory records
router.post("/subCategory", (req, res) => {
  const { subCategory, categoryId } = req.body;
  if (!subCategory || !categoryId) {
    return res.status(400).json({ error: "Subcategory name and category ID are required" });
  }
  const sql = "INSERT INTO subcategory (subcategory_name, category_id) VALUES (?, ?)";
  db.query(sql, [subCategory, categoryId], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "SubCategory added successfully!" });
  });
});

// Get subcategory records
router.get('/subcategory', (req, res) => {
  db.query('SELECT * FROM subcategory', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    res.json(results)
  })
})


module.exports = router
