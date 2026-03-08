import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fishRoutes from './routes/fish.routes';
import supportRoutes from './routes/support.routes';
import adminRoutes from "./routes/admin.routes";
import roadmapRoutes from "./routes/roadmap.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/fish', fishRoutes);

app.use('/api/support', supportRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/roadmap", roadmapRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});