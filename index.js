import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import express from "express";
import budgetsRoutes from "../routes/budgetsRoutes.js";
import categoriesRoutes from "../routes/categoriesRoutes.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";
import transactionsRoutes from "./routes/transactionsRoutes.js";
import reportsRoutes from "./routes/reportsRoutes.js";
import userRoutes from "./routes/userRoutes.js"

dotenv.config();
const port = process.env.PORT || 8000;
connectDB();
const app = express();
const corsOptions = {
  origin: "*",
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/budgets", budgetsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use('/api/reports', reportsRoutes)
app.use('/api/users',userRoutes)

app.listen(port, () => console.log(`Server started on port ${port}`));
