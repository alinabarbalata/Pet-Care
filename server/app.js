const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRouter = require('./routers/authRoutes');
const petRouter = require('./routers/petRoutes');



dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/auth',authRouter);
app.use('/api',petRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
