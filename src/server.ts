import express from 'express' ;
import dotenv from 'dotenv' ;  
import mongoose from 'mongoose';
import authRoutes from './routes/auth' ;


dotenv.config(); // loads environment variable from a .env file 

const app = express();

const PORT = process.env.PORT || 5000 ;

app.use(express.json()) ; // Middleware to parse incoming requests as JSON 

// Basic Route 
app.get('/',(req,res)=>{    // Sets up a route if someone accesses / they will see  msg""
    res.send("Welcome to the Hashers Marketplace Backend")
})

// server starts 
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

mongoose.connect(process.env.MONGO_URI!)
.then(() => {
    console.log('MongoDB connected');
  }).catch(err => console.log(err));
  
  app.use('/api/auth', authRoutes);
  

// Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. Middleware can:

// Execute any code.
// Make changes to the request and response objects.
// End the request-response cycle.
// Call the next middleware function in the stack.
