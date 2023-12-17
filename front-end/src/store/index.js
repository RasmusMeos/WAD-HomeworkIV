import { createStore } from 'vuex';
//import postsData from '@/data/posts.json';
import axios from 'axios';

export default createStore({
    state: {
        posts: []
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        incrementLikes(state, postId) {
            const post = state.posts.find((p) => p.id === postId);
            if (post) {
                post.likes += 1;
            }
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
        async deleteAllPosts({ dispatch }) {
            try {
                await axios.delete('http://localhost:3000/posts');
                dispatch('fetchPosts'); // Fetch the updated list of posts
            } catch (error) {
                console.error('Error deleting all posts:', error);
            }
        },
      
    },
    modules: {},
});
