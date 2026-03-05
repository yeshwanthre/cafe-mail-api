import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import rateLimit from "express-rate-limit"
import mailRoutes from "./routes/mailRoutes.js"

const app = express()

app.use(cors({
  origin: [
    "https://cafenamasthe.in",
    "https://www.cafenamasthe.in",
    "http://localhost:5173"
  ]
}))

app.use(express.json())

const formLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20
})

app.use("/api/mail", formLimiter, mailRoutes)

app.get("/", (req,res)=>{
  res.send("Cafe Mail API running 🚀")
})

app.get("/ping",(req,res)=>{
  res.send("pong")
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})