<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import GiftListsPage from "./pages/SamplePage.vue";
import Vue from "vue";

export default Vue.extend({
  components: {GiftListsPage}
});
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>