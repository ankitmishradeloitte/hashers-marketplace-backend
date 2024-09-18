import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import itemRoutes from './routes/itemRoutes';
import transactionRoutes from './routes/transactionRoutes';
import dotenv from 'dotenv' ;

import './types/express'; // Import the type definition file


dotenv.config() ;


const app = express();

// Middleware
app.use(express.json());

const mongoURI = process.env.MONGO_URI  || 'mongodb+srv://Ankit:Ankit1234@cluster0.ymxqy.mongodb.net/hashers-marketplace?retryWrites=true&w=majority&appName=Cluster0';

// if (!mongoURI) {
//     throw new Error('MONGO_URI is not defined in the environment variables');
//   }
  
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true, // Ensure SSL is enabled
})
.then(() => {
    console.log('MongoDB connected');
  }).catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/transactions', transactionRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
