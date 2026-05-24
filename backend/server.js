import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/infrastructure/db.js';
import authRoutes from './src/infrastructure/authRoutes.js';
import issueRoutes from './src/infrastructure/issueRoutes.js';
import ActivityRoutes from './src/infrastructure/activityRoutes.js';


dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.VITE_BASE_URL, 
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/activities", ActivityRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: "API Works!" });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;