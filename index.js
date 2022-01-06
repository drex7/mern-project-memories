import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import postRoutes from './routes/posts.js';

// const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '30mb' }));
// app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use('/posts', postRoutes);

const __dirname = path.resolve();
console.log('dirname: ', __dirname);
app.use(express.static(path.join(__dirname + './client/build/')));

// If no API routes are hit, send the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const DB_URI = process.env.DB_URI; //"mongodb+srv://juice1:Juice123@cluster0.c3bn6.mongodb.net/MemoriesDB?retryWrites=true&w=majority";
const DB_URI0 = "mongodb://localhost:27017/memoriesDB";


mongoose.connect(
  DB_URI, 
  {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.log(err));

// mongoose.set('useFindAndModify', false);
