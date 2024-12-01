const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const subcategoryRoutes = require('./routes/subcategoryRoutes')
const natureofcomRoutes = require('./routes/natureofcomRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/public', express.static('public'))

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/subcategory', subcategoryRoutes)
app.use('/api/natureofcompliance', natureofcomRoutes)
app.use('/api/usermanagement', userRoutes)

module.exports = app
