<template>
  <section id="login">
    <form>
      <h2>Sign up</h2>
      <div class="info" v-bind:class="this.good">
        <p>{{ this.alert.message }}</p>
      </div>
      <label>
        <input type="text" v-model="login.username" placeholder="Username"/>
      </label>
      <label>
        <input type="text" v-model="login.email" placeholder="Email"/>
      </label>
      <label>
        <input type="password" v-model="login.password" placeholder="Password"/>
      </label>
      <button v-on:click="onSubmit">Sign up</button>
    </form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      alert: {
        message: "Error"
      },
      login: {
        username: "",
        email: "",
        password: ""
      },
      shake: false,
      good: ""
    }
  }
  ,
  methods: {
    onSubmit: function (event) {
      event.preventDefault();

      const username = this.login.username;
      const email = this.login.email;
      const password = this.login.password;

      // stop here if form is invalid
      if (!(username && email && password)) {
        return;
      }

      const onCreateUser = (error) => {
        if (!error) {
          this.$router.push({
            name: 'GiftLists'
          });
        } else {
          console.error("Error:" + JSON.stringify(error));
        }
      }

      console.log(this.password)

      Accounts.createUser({
        username: username,
        email: email,
        password: password
      }, onCreateUser);
    }
  }
});
</script>

<style scoped>

</style>