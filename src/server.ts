import express, { Request, Response } from "express";
import dotenv from "dotenv";
import tokenRoutes from "./routes/route.token";
import job from "./config/corn";

dotenv.config();

const app = express();

job.start();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/tokens", tokenRoutes);

app.get("/api/recall", (req: Request, res:Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "tokenizer-api",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
