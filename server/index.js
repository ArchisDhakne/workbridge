import express, { urlencoded } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

// Routes
import authRoutes from './routes/authRoute.js'
import jobRoutes from './routes/jobRoutes.js'
import applicationRoutes from "./routes/applicationRoutes.js";

dotenv.config()
const app = express()

const allowedOrigins = [
  "https://workbridge-five.vercel.app",
  "http://localhost:5173" // helpful for local dev
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json())
app.use(urlencoded({extended:true}));

app.use('/api/users', authRoutes)
app.use('/api/jobs', jobRoutes)
app.use("/api/applications", applicationRoutes);


const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

// DB connection and server start
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err.message)
  })
