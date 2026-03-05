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
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
  })
)

app.use(express.json())

/* API ROUTES */
app.use("/api/mail", mailRoutes)

/* ROOT CHECK */
app.get("/", (req, res) => {
  res.send("Cafe Mail API running 🚀")
})

/* KEEP RENDER AWAKE */
app.get("/ping", (req, res) => {
  res.send("pong")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})