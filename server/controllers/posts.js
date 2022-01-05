import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ error: error.message });  
  }
  
};

export const createPost = async (req, res) => {
  const { creator, title, message, tags, selectedFile } = req.body;

  const newPost = new PostMessage({ creator, title, message, tags, selectedFile });

  try {
    await newPost.save();
    
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  console.log('Update post req body', post);

  if( !mongoose.Types.ObjectId.isValid(_id) ) return res.status(404).send('No post with this id.');
  
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
  
  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  
  if( !mongoose.Types.ObjectId.isValid(_id) ) return res.status(404).send('No post with this id.');

  await PostMessage.findByIdAndRemove(_id);
  
  res.json({ message: 'Post deleted successfully.' });
}

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  
  if( !mongoose.Types.ObjectId.isValid(_id) ) return res.status(404).send('No post with this id.');
  
  const post = await PostMessage.findById(_id);
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });
  
  res.json(updatedPost);
}