import express from 'express';

import { getPosts, createPost, updatePost , deletePost /*getPost*/, likePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
// router.get('/:id', getPost);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;
