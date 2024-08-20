import usersApp from "./app.js";
import mongoose from 'mongoose';

const port = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/motiv8-DB', {
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

usersApp.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

