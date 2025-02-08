import express from 'express'
import {getPost, createPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts, getUserPosts} from '../controllers/postController.js'
import protectRoute from '../middlewares/protectRoute.js';
const router = express.Router();

router.get('/feed',protectRoute , getFeedPosts);
router.get('/:id', getPost);
router.post('/create', protectRoute, createPost);
router.get("/user/:username", getUserPosts);
router.put('/like/:id', protectRoute,likeUnlikePost);
router.put('/reply/:id', protectRoute,replyToPost);
router.delete('/:id', protectRoute, deletePost);


export default router;