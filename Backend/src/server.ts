import express, { NextFunction, Request, Response, json } from 'express'
import cors from 'cors'
import user_router from './routes/userRoutes'
import tour_router from './routes/tourRoutes'
import review_router from './routes/reviewRoutes'
import booking_router from './routes/bookingRoutes'

const app = express()

app.use(cors())
app.use(json())

app.use('/user', user_router)
app.use('/tours', tour_router)
app.use('/reviews', review_router )
app.use('/bookings', booking_router)

app.use((error: Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({
        message: error.message
    })
})

app.listen(1200, ()=>{
    console.log("Server running on port 1200");
})