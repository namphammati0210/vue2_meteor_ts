<template>
  <v-row class="app-header d-flex align-items-center" id="gift-lists-page-header">

    <v-col cols="2">
      <b-dropdown id="dropdown-menu-items" text="Account" class="m-md-2">
        <b-dropdown-item>Account</b-dropdown-item>
        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item>{{getEmailAddress() }}</b-dropdown-item>
      </b-dropdown>
    </v-col>

    <h3 className="col text-light">Sample Page</h3>

  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend( {
  components: {},
  methods: {
    getEmailAddress(){
      const user = Meteor.user();
      if(user){
        return user.emails[0].address;
      } else {
        return "Not logged in";
      }
    },
    logout() {
      Meteor.logout();

      this.$router.push({
        name: 'Login'
      });
    }
  }
});
</script>

<style scoped>
#gift-lists-page-header {
  background-color: darkblue;
}
</style>