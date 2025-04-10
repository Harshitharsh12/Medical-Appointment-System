import express, { json } from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// dotenv config
dotenv.config();

// mongodb Connection:
connectDB();

// rest object
const app = express();

// middleeares:
app.use(express.json());
app.use(morgan("dev"));
// app.use(cors());

// routes:
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const port = process.env.PORT || 8080;
const mode = process.env.DEV_MODE;
// loisten port
app.listen(port, () => {
  console.log(`Server Running on port ${port} in ${mode} mode`.bgCyan.white);
});
