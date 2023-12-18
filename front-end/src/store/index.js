import { createStore } from 'vuex';
//import postsData from '@/data/posts.json';
import axios from 'axios';

export default createStore({
    state: {
        posts: [],
        currentPost: null,
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setCurrentPost(state, post) {
            state.currentPost = post;
          },
     
    },
    actions: {
        //Methods for retrieving posts and resetting likes
        async fetchPosts({commit}) {
            try {
                const response = await axios.get('http://localhost:3000/posts');
                commit('setPosts',response.data);
            } catch (error) {
                console.error('Error fetching posts:',error);
            }
        },
        async fetchPost({ commit }, postId) {
            try {
              const response = await axios.get(`http://localhost:3000/posts/${postId}`);
              commit('setCurrenPost', response.data); 
            } catch (error) {
              console.error('Error fetching post:', error);
              return null;
            }
          },
        async deleteAllPosts({ dispatch }) {
            try {
                await axios.delete('http://localhost:3000/posts');
                dispatch('fetchPosts'); // Fetch the updated list of posts
            } catch (error) {
                console.error('Error deleting all posts:', error);
            }
        },
        async addPost({ dispatch }, postData) {
            try {
              await axios.post('http://localhost:3000/posts', postData);
              dispatch('fetchPosts'); // Fetch the updated list of posts
            } catch (error) {
              console.error('Error adding the post:', error);
            }
          },
        async updatePostById({ dispatch }, { id, body }) {
            try {
                await axios.put(`http://localhost:3000/posts/${id}`, { body });
                dispatch('fetchPosts'); 
            } catch (error) {
                console.error('Error updating the post:', error);
            }
            
          },
        async deletePostById({ dispatch }, id) {
            try {
                await axios.delete(`http://localhost:3000/posts/${id}`);
                dispatch('fetchPosts'); 
            } catch (error) {
                console.error('Error deleting the post:', error);
            }
            
          },
      
    },
    modules: {},
});
