import express from "express"
import cors from "cors"
import { limiter } from "./utils/ratelimitter.utils.js"

//importing routes
import adminRoute from "./routes/admin.route.js"
import companyRoute from "./routes/company.route.js"
import kitchenRoute from "./routes/kitchen.route.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//middlewares
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(limiter)

//routes
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/company', companyRoute)
app.use('/api/v1/kitchen', kitchenRoute)

export { app }