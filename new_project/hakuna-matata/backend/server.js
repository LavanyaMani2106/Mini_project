require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hakuna-matata';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.log('Database connection failed:', error);
});
MONGO_URI=mongodb+srv://lavanyaklavanya259_db_user:<sxZj1UEUScJqipRU>@cluster.btkvyhz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster