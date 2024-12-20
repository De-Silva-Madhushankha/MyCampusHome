import express, { json } from 'express';
import { config } from 'dotenv';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './utils/errorHandler';

config();

connectDB();

const app = express();

app.use(json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));