<template>
  <div>
    <Header />
    <div class="content-area">
      <div class="sidebox"></div>
      <div class="posts">
        <Post v-for="post in posts" :key="post.id" :post="post" />
        <button class="reset-likes-button" @click="handleResetLikes">Reset Likes</button>
      </div>
      <div class="sidebox"></div>
    </div>
    <Footer />
  </div>
</template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  import Header from '@/components/CompoHeader.vue';
  import Footer from '@/components/CompoFooter.vue';
  import Post from '@/components/PostItem.vue';
  export default {
    name: 'MainPage',
    components: {
      Header,
      Footer,
      Post,
    },
    computed: {
      ...mapState(['posts']),
    },
    methods: {
      ...mapActions(['fetchPosts', 'resetLikes']),
    
      handleResetLikes() {
        console.log('Reset Likes button clicked');
        this.resetLikes();
      },
    },
    created() {
      this.fetchPosts();
    },
  };
  </script>
  
  <style scoped>
  .content-area {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 0 20px;
    min-height: calc(100vh - 60px - 40px);
    gap: 20px;
  }
  .sidebox {
    background-color: #868686;
    width: 15%;
    flex-grow: 1;
    border-radius: 10px;
  }
  
  .posts {
    width: 68%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .reset-likes-button {
    margin-top: 20px;
    padding: 15px 20px;
    background-color: rgb(122, 175, 255);
    color: black;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s;
    align-self: center;
  }

  .reset-likes-button:hover {
    background-color: rgb(72, 145, 255);
  }
  </style>
  