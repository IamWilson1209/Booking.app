import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import usersRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes';
import cookieParser from 'cookie-parser';
import path from 'path';

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log("Connected to MongoDB", process.env.MONGODB_URL));


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL, // replace with frontend URL
    credentials: true,
}));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})