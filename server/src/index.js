import express from 'express';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import dotenv from 'dotenv';
import connectDB from './db/index.db.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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


