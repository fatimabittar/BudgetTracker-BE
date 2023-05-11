import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import express from "express";


dotenv.config();
const port = process.env.PORT || 8000;
connectDB();
const app = express();
const corsOptions = {
    origin: "*",
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({
  extended: true
}));

//you use these inorder to use the body data


app.listen(port, () => console.log(`Server started on port ${port}`));