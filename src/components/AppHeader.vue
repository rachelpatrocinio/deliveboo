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

  <header class="d-flex pb-1">
    <div class="container d-flex justify-content-between align-items-center p-0">
      <div class="logo col-3">
        <RouterLink to="/"><img src="../../../public/logo.png" alt="DeliveBoo"></RouterLink>
      </div>
      <div class="col-3 text-end">
        <RouterLink class="link" to="/admin">Area Riservata Admin</RouterLink>
        <RouterLink to="/carrello">
          <img class="cart-button mx-2" src="../../../public/icons/cart.png" alt="">
        </RouterLink>
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
  border-bottom: 2px solid var(--color-darkgreen);
  z-index: 100;
}

.logo{
  img{
    width: 200px;
  }
}

.cart-button{
  width: 30px;
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