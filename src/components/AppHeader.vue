<script>

export default {
  components: {
  },
  data() {
    return {
    }
  }
}

</script>

<template>

  <header class="d-flex">
    <div class="container d-flex justify-content-between align-items-center p-0">
      <div class="logo col-3">
        <RouterLink to="/"><img src="../../../public/logo.png" alt="DeliveBoo"></RouterLink>
      </div>
      <div class="col-6 position-relative">
        <input name="searchbar" class="searchbar" id="searchbar" type="text">
        <label for="searchbar"><img class="glass-icon" src="../../../public/icons/magnifying-glass.png" alt=""></label>
      </div>
      <div class="col-3 text-end">
        <RouterLink class="link" to="/admin">Area Riservata Admin</RouterLink>
      </div>
    </div>
  </header>

</template>

<style lang="scss" scoped>
@import '../style/partials/layout';
header{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  background-color: var(--color-yellow);
}

.logo{
  img{
    width: 200px;
  }
}

.searchbar{
  width: 100%;
  border-radius: 99px;
  border: 2px solid var(--color-darkgreen);
  padding: 8px 50px;
  outline-color: var(--color-orange);
}

.glass-icon{
  position: absolute;
  left: 10px;
  top: 6px;
}

.link{
  text-decoration: none;
  color: var(--color-darkgreen);
  font-weight: 600;

  &:hover{
    color: var(--color-orange);
  }
}
</style>