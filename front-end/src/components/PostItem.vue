<template>
  <div class="post" @click="goToPostPage(post.id)">
    <div class="post-header">
      <img class="user-pic" src="/profile_pics/profile_pic.jpg" alt="User">
      <p v-if="post.title" class="post-title">{{ post.title }}</p>
      <p>{{ post.content }}</p>
      <span class="post-date">{{ formatDate(post.time) }}</span>
    </div>
    <div class="post-content">
      <img class="post-image" :src="post.photo_url" alt="Post" v-if="post.photo_url">
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import router from '../router';

export default {
  props: {
    post: Object,
  },
  methods: {
    goToPostPage(postId) {
      router.push({ name: 'PostPage', params: { id: postId } });
    },
    formatDate(isoDate) {
      const date = new Date(isoDate);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },
  },
};
</script>

<style scoped>
.like-button {
  width: 24px; /* Adjusts the size of the thumbs-up image */
  height: 24px;
  cursor: pointer;
}

.like-count {
  margin-left: 5px;
}
.post {
  background-color: lightgray;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; /* Adds margin between posts */
}

.post:first-child {
  box-shadow: none;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-pic {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.post-date {
  color: black;
}

.post-content {
  margin-top: 10px;
}

.post-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

/* Adds styling for the border between posts */
.posts .post + .post {
  border-top: 1px solid #c5c5c5;
}
.post {
  cursor:pointer;
}
.post:hover {
  background-color: #bdbdbd;
}
</style>
