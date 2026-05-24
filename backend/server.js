import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/infrastructure/db.js';
import authRoutes from './src/infrastructure/authRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);


app.get('/api/test', (req, res) => {
  res.json({ message: "API Works!" });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;