import express from 'express'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
const PORT=process.env.PORT || 5000
const app= express();

connectDB();
app.use(express.json()); //To parse JSON data in req body
app.use(express.urlencoded({extended:false}));// To parse form data in req body
app.use(cookieParser());

//routes
app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)

app.listen(PORT,()=>console.log(`server running on ${PORT}`))