<script>
import { store } from "./store.js";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <div id="app">
    <AppHeader></AppHeader>
    <main class="main">
      <RouterView />
    </main>
    <AppFooter></AppFooter>
  </div>
</template>

<style lang="scss">
@import "bootstrap";
</style>
