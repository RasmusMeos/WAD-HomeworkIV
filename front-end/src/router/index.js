import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AddPost from '../views/AddPost.vue'
import PostPage from '../views/PostPage.vue'
import ContactUs from '../views/ContactUs.vue'
import LoginPage from '../views/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/addpost',
    name: 'AddPost',
    component: AddPost
  },
  {
    path: '/contact-us', // Route for the Contact Us page
    name: 'ContactUsPage',
    component: ContactUs
  },
  {
    path: '/Login', // Route for the Contact Us page
    name: 'LoginPage',
    component: LoginPage
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
