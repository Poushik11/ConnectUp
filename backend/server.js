// import path from "path";
import express from "express";
import "colors";

import { config } from "dotenv";
import errorHandler from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

config();
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/tickets/:ticketId/notes", noteRoutes);

// // Serve Frontend
// if (process.env.NODE_ENV === "production") {
//   // Set build folder as static
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   // FIX: below code fixes app crashing on refresh in deployment
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.status(200).json({ message: "Welcome to the Support Desk API" });
//   });
// }

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
