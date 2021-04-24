<template>
  <v-row>
    <h4>Sample page content</h4>
  </v-row>
</template>

<script lang="ts">

import Vue from "vue";

export default Vue.extend( {
  components: {},
  props: {
    giftList: {
      type: Object
    }
  },
});
</script>

<style scoped>
</style>