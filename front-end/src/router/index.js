import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import AddPost from '../views/AddPost.vue'
import PostPage from '../views/PostPage.vue'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/addpost',
    name: 'AddPost',
    component: AddPost
  },

  {
    path: '/post',
    name: 'PostPage',
    component: PostPage
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
