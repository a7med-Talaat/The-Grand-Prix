const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const teamRoutes = require('./routes/teams');
const meetupRoutes = require('./routes/meetups');
const strategyRoutes = require('./routes/strategies');
const userRoutes = require('./routes/users');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'grandprix_secret';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/meetups', meetupRoutes);
app.use('/api/users', userRoutes);
app.use('/api/strategies', strategyRoutes);

app.get('/', (req, res) => {
  res.send('The Grand Prix API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
