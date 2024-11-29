const db = require('../db')

// Get subcategory records
exports.getSubcategories = (req, res) => {
  db.query(`SELECT subcategory.*, category.category_name FROM subcategory JOIN category 
    ON subcategory.category_id = category.id`, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' })
    res.json(results)
  })
}

// Get a single subcategory record
exports.getSubCategoryById = (req, res) => {
  const subCategoryId = req.params.id
  db.query(`SELECT subcategory.*, category.* FROM subcategory JOIN category 
    ON subcategory.category_id = category.id WHERE subcategory.id = ?;`, [subCategoryId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' })
    if (results.length === 0) return res.status(404).json({ message: 'SubCategory not found' })
    res.json(results[0])
  })
}

// Add subcategory records
exports.addSubcategory = (req, res) => {
  const { subCategory, categoryId } = req.body
  if (!subCategory || !categoryId) return res.status(400).json({ message: 'Subcategory name and category ID are required' })

  db.query('INSERT INTO subcategory (subcategory_name, category_id) VALUES (?, ?)', [subCategory, categoryId], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' })
    res.status(201).json({ message: 'SubCategory added successfully!' })
  })
}

// Update subcategory records
exports.updateSubCategory = (req, res) => {
  const subCategoryId = req.params.id
  const { subCategory, categoryId } = req.body
  if (!subCategory || !categoryId) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const query = 'UPDATE subcategory SET subcategory_name = ?, category_id = ? WHERE id = ?'
  db.query(query, [subCategory, categoryId, subCategoryId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' })
    if (results.affectedRows === 0) return res.status(404).json({ message: 'SubCategory not found' })
    res.status(200).json({ message: 'SubCategory updated successfully' })
  })
}

// Delete subcategory records
exports.deleteSubCategory = (req, res) => {
  const subCategoryId = req.params.id
  db.query('DELETE FROM subcategory WHERE id = ?', [subCategoryId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Internal server error' })
    if (results.affectedRows === 0) return res.status(404).json({ message: 'SubCategory not found' })
    res.status(200).json({ message: 'SubCategory deleted successfully' })
  })
}
