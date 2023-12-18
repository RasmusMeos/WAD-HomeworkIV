import { createStore } from 'vuex';
import axiosInstance from '../services/axiosConfig';

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
                const response = await axiosInstance.get('/posts');
                commit('setPosts',response.data);
            } catch (error) {
                console.error('Error fetching posts:',error);
            }
        },
        async fetchPost({ commit }, postId) {
            try {
              const response = await axiosInstance.get(`/posts/${postId}`);
              commit('setCurrenPost', response.data); 
            } catch (error) {
              console.error('Error fetching post:', error);
              return null;
            }
          },
        async deleteAllPosts({ dispatch }) {
            try {
                await axiosInstance.delete('/posts');
                dispatch('fetchPosts'); // Fetch the updated list of posts
            } catch (error) {
                console.error('Error deleting all posts:', error);
            }
        },
        async addPost({ dispatch }, postData) {
            try {
              await axiosInstance.post('/posts', postData);
              dispatch('fetchPosts'); // Fetch the updated list of posts
            } catch (error) {
              console.error('Error adding the post:', error);
            }
          },
        async updatePostById({ dispatch }, { id, body }) {
            try {
                await axiosInstance.put(`/posts/${id}`, { body });
                dispatch('fetchPosts'); 
            } catch (error) {
                console.error('Error updating the post:', error);
            }
            
          },
        async deletePostById({ dispatch }, id) {
            try {
                await axiosInstance.delete(`/posts/${id}`);
                dispatch('fetchPosts'); 
            } catch (error) {
                console.error('Error deleting the post:', error);
            }
            
          },
              // Action for user signup
    async signup(userData) {
        try {
          await axiosInstance.post('/signup', userData);
        } catch (error) {
            console.error('Error signing up:', error);
        }
      },
  
      // Action for user login
      async login(userData) {
        try {
          const response = await axiosInstance.post('/login', userData);
          // Storing the received JWT token
          localStorage.setItem('userToken', response.data.token);
          
        } catch (error) {
            console.error('Error logging in:', error);
        }
      },
      
    },
    getters: {
        isLoggedIn: () => !!localStorage.getItem('userToken'),
      },
    modules: {},
});
