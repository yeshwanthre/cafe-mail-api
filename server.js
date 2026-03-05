import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import mailRoutes from "./routes/mailRoutes.js"

const app = express()

app.use(
  cors({
    origin: [
      "https://cafenamasthe.in",
      "https://www.cafenamasthe.in",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
)

app.use(express.json())

app.use("/api/mail", mailRoutes)

app.get("/", (req, res) => {
  res.send("Cafe Mail API running 🚀")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})