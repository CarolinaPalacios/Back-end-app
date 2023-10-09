import mongoose from 'mongoose';
import { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } from '../utils/env.js';

// conexión a base de datos mongodb

const collectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI;

mongoose
  .connect(collectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

process.on('uncaughtException', () => {
  mongoose.connection.close();
});
