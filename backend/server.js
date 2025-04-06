import express from 'express'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import messageRoutes from "./routes/messageRoutes.js";
import {io, server, app} from './socket/socket.js'
import path from 'path';
import dotenv from "dotenv";
// import {renderapp,renderappp} from './utils/helpers/render.js';

const PORT=process.env.PORT || 8000
import {v2 as cloudinary} from 'cloudinary'
const __dirname=path.resolve(); 
dotenv.config();
// renderapp.start();
// renderappp.start();
connectDB();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_KEY_SECRET
})
app.use(express.json({limit:'50mb'})); //To parse JSON data in req body. limit:'50mb' for the payload error. Now it will allow upto 50mb
app.use(express.urlencoded({extended:false}));// To parse form data in req body
app.use(cookieParser());

//routes
app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)
app.use("/api/messages", messageRoutes);

//...:8000  backAndfront
if(process.env.NODE_ENV=='production'){
    app.use(express.static(path.join(__dirname,'/frontend/dist')));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

server.listen(PORT,()=>console.log(`server running on ${PORT}`))