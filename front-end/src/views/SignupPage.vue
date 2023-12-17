<template>
  <div>
    <Header />
    
    <div class="outer-container">
      <div class="signup-container">
        <form class="signup-form" @submit.prevent="handleSignup">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" v-model="email" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <button type="submit" class="signup-button">Signup</button>
        </form>
      </div>
    </div>
  
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/CompoHeader.vue';
import Footer from '@/components/CompoFooter.vue';

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      email: "",
      password: "",
      passwordValidationMessage: "",
    };
  },
  methods: {
    handleSignup() {
      // Validate the password before attempting to submit
      const regexUpperCase = /[A-Z]/;
      const regexLowerCase = /[a-z]/;
      const regexNumeric = /[0-9]/;
      const regexUnderscore = /_/;

      const isLengthValid = this.password.length >= 8 && this.password.length < 15;
      const hasUpperCase = regexUpperCase.test(this.password);

      // Count lowercase letters using a loop
      let lowercaseCount = 0;
      for (const char of this.password) {
        if (regexLowerCase.test(char)) {
          lowercaseCount++;
        }
      }

      const hasTwoLowerCase = lowercaseCount >= 2;
      
      const hasNumeric = regexNumeric.test(this.password);
      const startsWithUpperCase = regexUpperCase.test(this.password[0]);
      const hasUnderscore = regexUnderscore.test(this.password);

      if (
        isLengthValid &&
        hasUpperCase &&
        hasTwoLowerCase &&
        hasNumeric &&
        startsWithUpperCase &&
        hasUnderscore
      ) {
        this.passwordValidationMessage = "";
        
        
      } else {
        this.passwordValidationMessage =
          "Password must meet the following conditions:\n" +
          "- At least 8 and less than 15 characters\n" +
          "- At least one uppercase letter\n" +
          "- At least two lowercase letters\n" +
          "- At least one numeric value\n" +
          "- Start with an uppercase letter\n" +
          "- Include the character '_'";
        
        // Password is not valid, show a popup message
        window.alert(this.passwordValidationMessage);
        return;
      }


    },
  },
};
</script>
  
  <style scoped>

.outer-container {
  background-color: #868686; 
  padding: 30px; 
  border-radius: 10px;
  margin: auto; 
  width: calc(100% - 121px);
  margin-top: 10px;
  height: 30vw;
}

.signup-container {
  background-color: rgb(243, 255, 221);
  text-align: center;
  padding: 8%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
 
  
}

.signup-form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.form-group label {
  color: black;
  margin-right: 25px; /* Spacing between label and input */
}

.form-group input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
  color: black; 
}

.signup-button {
  background-color: rgb(122, 175, 255);
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center; /* Center the button */
  margin-top: 20px; /* Spacing from the last input field */
}

.signup-button:hover {
  background-color: rgb(72, 145, 255);
}

</style>
