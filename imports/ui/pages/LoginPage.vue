<template>
  <div>
  <section id="login">
    <form>
      <h2>Login</h2>
      <div class="info" v-bind:class="this.good">
        <p>{{ this.alert.message }}</p>
      </div>
      <label>
        <input type="text" v-model="login.login" placeholder="Username"/>
      </label>
      <label>
        <input type="password" v-model="login.password" placeholder="Password"/>
      </label>
      <button v-on:click="onSubmit">Log in</button>
    </form>

  </section>

    <button v-on:click="signUp">Sign up</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      alert: {
        message: ""
      },
      login: {
        login: "",
        password: ""
      },
      shake: false,
      good: "",
      fake: {
        login: "vincent",
        password: "admin"
      }
    }
  }
  ,
  methods: {
    signUp: function (): void {
      this.$router.push({name: "SignUp"})
    },
    onSubmit: function (event): void {
      event.preventDefault();

      const username = this.login.login;
      const password = this.login.password;

      // stop here if form is invalid
      if (!(username && password)) {
        return;
      }

      Meteor.loginWithPassword(username, password, error => {

        // On success
        if (!error) {
          this.$router.push({
            name: 'GiftLists'
          });
        } else {
          console.error("Error:" + JSON.stringify(error));
        }
      });

    }
  }
});
</script>

<style scoped>

</style>