import { createRouter, createWebHistory } from 'vue-router'
//import store from '../store'
import HomePage from '../views/HomePage.vue'
import AddPost from '../views/AddPost.vue'
import PostPage from '../views/PostPage.vue'
import ContactUs from '../views/ContactUs.vue'
import LoginPage from '../views/LoginPage.vue'
import SignupPage from '../views/SignupPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/addpost',
    name: 'AddPost',
    component: AddPost,
    meta: { requiresAuth: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage
  },
  {
    path: '/contact-us', // Route for the Contact Us page
    name: 'ContactUsPage',
    component: ContactUs
  },
  {
    path: '/login', // Route for the login page
    name: 'LoginPage',
    component: LoginPage
  },

  {
    path: '/post/:id',
    name: 'PostPage',
    component: PostPage,
    meta: { requiresAuth: true }
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation guard to check for authentication
/*router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isLoggedIn) {
    // Redirect to login page if not authenticated
    next({ name: 'LoginPage' });
  } else {
    next(); // Proceed to route
  }
});*/


export default router
