import express from 'express';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import dotenv from 'dotenv';
import connectDB from './db/index.db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

const port = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log(error);
            throw error;
        });

        app.listen(port, () => {
            console.log(`Server running at Port: http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log("MONGO DB CONNECTION FAIL!!!: ", err);
    });


