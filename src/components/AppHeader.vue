<script>
import { store } from "../store.js";

export default {
  data() {
    return {
      store
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
        <RouterLink class="link" to="/admin">Collabora con noi!</RouterLink>
        <RouterLink to="/carrello" class="position-relative">
          <img class="cart-button mx-2" src="../../../public/icons/cart.png" alt="">
          <div v-if="store.total_qty !== 0" class="qty">{{ store.total_qty }}</div>
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

.qty{
  position: absolute;
  padding: 3px;
  top:-8px;
  right: 5px;
  background-color: var(--color-green);
  border-radius: 99px;
  color: black;
  font-size: 11px;
  width: 20px;
  height: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
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