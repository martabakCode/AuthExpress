const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { authenticateUser } = require('./middleware/authMiddleware');
const sequelize = require('./config/db');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Uncomment if you want to sync the database
// sequelize.sync({ force: true })
//   .then(() => {
//     console.log('Tables created successfully!');
//   })
//   .catch((err) => {
//     console.error('Error creating tables:', err);
//   });

// Use authRoutes for authentication endpoints
app.use('/', authRoutes);

// Use authenticateUser middleware for user-related endpoints
app.use(authenticateUser);

// Use userRoutes for user-related CRUD endpoints
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
