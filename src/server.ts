import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tokenRoutes from "./routes/route.token";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/tokens", tokenRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "tokenizer-api",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
