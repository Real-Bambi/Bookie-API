import express from 'express';
import mongoose from "mongoose";
import cors from cors
import 'dotenv/config'
import { bookRouter } from './routes/bookRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", bookRouter);

const mongoURI = process.env.MONGO_URI;

await mongoose.connect(mongoURI);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})