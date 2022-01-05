import { CREATE, FETCH_ALL, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api';

// Action creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    console.log('line 9: data', data);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);  
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    console.log('createPost: data', data);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    console.log('Deleting post');
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
}