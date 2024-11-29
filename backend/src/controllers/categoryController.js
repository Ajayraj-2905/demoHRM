const db = require('../db')

// Get category records
exports.getCategories = (req, res) => {
  db.query('SELECT * FROM category', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' })
    res.json(results)
  })
}

// Get a single category record
exports.getCategoryById = (req, res) => {
  const categoryId = req.params.id
  db.query('SELECT * FROM category WHERE id = ?', [categoryId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' })
    if (results.length === 0) return res.status(404).json({ message: 'Category not found' })
    res.json(results[0])
  })
}

// Add category records
exports.addCategory = (req, res) => {
  const { category } = req.body
  if (!category) return res.status(400).json({ message: 'Category is required' })

  db.query('INSERT INTO category (category_name) VALUES (?)', [category], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' })
    res.status(201).json({ message: 'Category created successfully' })
  })
}

// Update category records
exports.updateCategory = (req, res) => {
  const categoryId = req.params.id
  const { category } = req.body
  if (!category) {
    return res.status(400).json({ message: 'Category name is required' })
  }

  const query = 'UPDATE category SET category_name = ? WHERE id = ?'
  db.query(query, [category, categoryId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' })
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Category not found' })
    res.status(200).json({ message: 'Category updated successfully' })
  })
}

// Delete category records
exports.deleteCategory = (req, res) => {
  const categoryId = req.params.id
  db.query('DELETE FROM category WHERE id = ?', [categoryId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Internal server error' })
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Category not found' })
    res.status(200).json({ message: 'Category deleted successfully' })
  })
}
