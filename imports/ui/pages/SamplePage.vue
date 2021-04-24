<template>
  <div>
    <sample-page-header></sample-page-header>

    <sample-page-content></sample-page-content>
  </div>
</template>

<script lang="ts">
import SamplePageHeader from "../components/samplepagecomponents/SamplePageHeader.vue";
import Vue from "vue";
import SamplePageContent from "../components/samplepagecomponents/SamplePageContent.vue";

export default Vue.extend({
  components: {SamplePageHeader, SamplePageContent},
});
</script>