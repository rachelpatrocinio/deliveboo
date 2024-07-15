<script>
import { store } from "./store.js";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import UpButton from './components/UpButton.vue';


export default {
  components: {
    AppHeader,
    AppFooter,
    UpButton
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
      <UpButton></UpButton>
    </main>
    <AppFooter></AppFooter>
  </div>
</template>

<style lang="scss">
@import "bootstrap";
</style>
