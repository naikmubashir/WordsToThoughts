import User from "../models/UserModel.js";
import Post from "../models/postModel.js";
import {v2 as cloudinary} from 'cloudinary'
export const createPost= async (req,res)=>{
    try {
        const {postedBy, text}=req.body;
        let {img}=req.body;
        if(!postedBy || !text){
            return res.status(400).json({error:'PostedBy and Text fields are required'})
        }
        const user= await User.findById(postedBy);
        if(!user){
            return res.status(404).json({error:'User nto found'})
        }
        if(user._id.toString()!== req.user._id.toString()) {//or postedBy!== req.user._id
            console.log(user._id)
            console.log(req.user._id)
            return res.status(401).json({error:'unauthorized to create post'})
        }
        const maxLength=500;
        if(text.length >maxLength){
            return res.status(400).json({error:`Test must be less than ${maxLength} characters`})
        }
        if(img){
            const uploadedResponse= await cloudinary.uploader.upload(img);
            img=uploadedResponse.secure_url;
        }
        const newPost= new Post({postedBy, text, img});
        await newPost.save();
        res.status(201).json({message:'Post created successfully', newPost})
    } catch (err) {
        res.status(500).json({error:err.message});
        console.log(err);
    }
}

export const getPost= async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404 ).json({message:'Post not found...'})
        }
        res.status(200).json({post})
    } catch (err) {
        res.status(500).json({message:err.message});
        console.log(err);
    }
}

export const deletePost= async (req,res) => {
    try {
        const post= await Post.findById(req.params.id);
        if(!post){
            return res.status(404 ).json({error:'Post not found...'})
        }
        if(req.user._id.toString() !== post.postedBy.toString()){
            return res.status(401).json({error:'Not authorized t delete this post'})
        }
         await Post.findByIdAndDelete(req.params.id);
         res.status(200).json({message:"Post deleted successfully.."})
        
    } catch (error) {
        res.status(500).json({message:err.message});
        console.log(err);
    }
}

export const likeUnlikePost= async (req,res) => {
   try {
    const {id:postId}=req.params;
    const userId=req.user._id; //from protectroute middleware
    const post= await Post.findById(postId);
    if(!post){
        return res.status(404).json({message:'Post not found...'})
    }
    const userLikedPost= post.likes.includes(userId);//checking if user has already liked the post. If already liked then unlike it and vice verse. TOGGLE
    if(userLikedPost){
        //unlike post
        await Post.updateOne({_id:postId}, {$pull:{likes:userId}});
        res.status(200).json({message:'Post unliked successfully'})
    }else{
        //like post
        await Post.updateOne({_id:postId},{$push:{likes:userId}});
        res.status(200).json({message:'Post liked successfully'})
        
    }

   } catch (err) {
    res.status(500).json({message:err.message});
    console.log(err);
   }
}

export const replyToPost=async (req,res)=>{
    try {
        const {text}= req.body;
        const postId=req.params.id;
        const userId= req.user._id;
        const userProfilePic= req.user.userProfilePic;
        const username= req.user.username;
        if(!text){
            return res.status(400).json({message:'Text field is required'})
        }
        const post= await Post.findById(postId);
        if(!post){
            return res.status(404).json({message:'Post not found...'})
        }
        const reply= {text, userProfilePic, userId, username}
        post.replies.push(reply);
        await post.save();
        res.status(200).json({message:'Reply added successfully', post})

    } catch (err) {
        res.status(500).json({message:err.message});
        console.log(err);
    }
}

export const getFeedPosts= async (req,res)=>{
    try {
        const userId=req.user._id;
        const user=await User.findById(userId);
        if(!user){
            return res.status(401).json({message:'Unauthorized to see the feeds...'})
        }
        const following = user.following || [];
        const feedPosts = await Post.find({ postedBy: { $in: following } })
        .sort({ createdAt: -1 }) 
        //.limit(50);
        res.status(200).json({feedPosts})
    } catch (err) {
        res.status(500).json({message:err.message});
        console.log(err);
    }
}