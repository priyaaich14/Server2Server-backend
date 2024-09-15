import mongoose from 'mongoose';

const configureDB = async () => {
  try {
    const db = await mongoose.connect('mongodb://localhost:27017/mar-s2s');
    console.log('Connected to DB:', db.connections[0].name);
  } catch (err) {
    console.log('Error connected to DB:', err);
  }
};

export default configureDB
