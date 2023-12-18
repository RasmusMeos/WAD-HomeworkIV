<template>
  <div>
    <Header />
    <div class="light-green-container">
      <div class="grey-container">
        <h2>A Post</h2>
      </div>
      <div class="white-container">
        <div class="form-group">
          <label for="body">Body</label>
          <input type="text" id="body" name="body" placeholder="body" v-model="postBody" />
        </div>

        <div class="button-container">
          <button @click="updatePost" class="update-button">Update</button>
          <button @click="deletePost" class="delete-button">Delete</button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
  
<script>
import { mapActions } from 'vuex';
import Header from '@/components/CompoHeader.vue';
import Footer from '@/components/CompoFooter.vue';

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      postBody: '', 
      postId: null,  
    };
  },
  methods: {
    ...mapActions(['fetchPost', 'updatePostById', 'deletePostById']),
    async updatePost() {
      if (this.postBody) {
        await this.updatePostById({ id: this.postId, body: this.postBody });
        this.$router.push('/');
        // Redirect or give feedback
      }
    },
    async deletePost() {
      await this.deletePostById(this.postId);
      this.$router.push('/');
      
    },
  },
  async created() {
    this.postId = this.$route.params.id;
    const post = await this.fetchPost(this.postId);
    if (post) {
      this.postBody = post.body; // Making sure the post is defined before accessing its properties
    } else {
      console.error('Post not found');
      // Handling the case where post is not found, e.g., redirect to home page
    }
  }
};
</script>
    
    <style scoped>
  
  .light-green-container {
  background-color: #d1f5d3;
  border-radius: 10px;
  padding: 20px;
  height: 30%;
  width: 95%;
  justify-content: center;
  align-items: center;
}

.grey-container {
  background-color: #d3d3d3;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}

.white-container {
  background-color: #d3d3d3;
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type='text'] {
  width: 50%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.update-button {
  background-color: blue;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
}

.update-button:hover {
  background-color: darkblue;
}

.delete-button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: darkred;
}

  
  </style>
  