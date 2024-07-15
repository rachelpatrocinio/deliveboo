<script>
import { store } from "../store.js";

export default {
  data() {
    return {
      store,
      dropdown: ''
    }
  },
  methods:{
    toggleDropDown(){
      if(this.dropdown === false){
        this.dropdown = true
      }
      else{
        this.dropdown = false
      }
    },
    closeDropDown(){
      this.dropdown = false;
      this.store.windowScroll();
    }
  },
  created() {
    this.toggleDropDown();
  },
}
</script>

<template>
  <header class="d-flex pb-1">
    <div class="container d-flex justify-content-between align-items-center p-0">
      <div class="logo col-3">
        <RouterLink to="/"><img src="../../../public/logo.png" alt="DeliveBoo"></RouterLink>
      </div>
      <div class="col-3 pe-3 d-block d-md-none text-end position-relative">
        <img src="../../../public/icons/menus.png" alt="" @click="toggleDropDown()">
        <div v-if="store.total_qty !== 0" class="qty-2">{{ store.total_qty }}</div>
      </div>
      <div class="col-8 d-flex justify-content-around text-end d-none d-md-block">
        <RouterLink class="link col-4 px-2" to="/admin" @click="store.windowScroll">Collabora con noi!</RouterLink>
        <RouterLink class="link col-4 px-2" to="/contatti" @click="store.windowScroll">Contattaci</RouterLink>
        <RouterLink to="/carrello" class="position-relative col-4 px-2" @click="store.windowScroll">
          <img class="cart-button mx-2" src="../../../public/icons/cart.png" alt="">
          <div v-if="store.total_qty !== 0" class="qty">{{ store.total_qty }}</div>
        </RouterLink>
      </div>
    </div>
  </header>
  <div class="dropdown d-flex flex-column col-12 text-center my-4" v-if="dropdown === true">
    <RouterLink class="link py-3" to="/admin" @click="closeDropDown">Collabora con noi!</RouterLink>
    <RouterLink class="link py-3" to="/contatti" @click="closeDropDown">Contattaci</RouterLink>
    <RouterLink to="/carrello" class="d-flex justify-content-center mt-2 link" @click="closeDropDown">
      <img class="cart-button py-2" src="../../../public/icons/cart.png" alt="">
      <div v-if="store.total_qty !== 0">{{ store.total_qty }}</div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
@import '../style/partials/layout';
header{
  background-color: var(--color-yellow);
  border-bottom: 2px solid var(--color-darkgreen);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.logo{
  img{
    width: 150px;
    padding: 10px 0;
  }
}

.cart-button{
  width: 30px;
}

.qty{
  position: absolute;
  padding: 3px;
  top:-8px;
  right: 10px;
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

.qty-2{
  position: absolute;
  padding: 3px;
  background-color: var(--color-green);
  right: 10px;
  top:0;
  border-radius: 99px;
  color: black;
  font-size: 12px;
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

.dropdown{
  background-color: var(--color-orange);
  top: 68px;
  position: fixed;
  z-index: 99;


  .link{
    border-bottom: 1px solid var(--color-darkgreen);
    padding: 5px;

    &:hover{
      color: var(--color-yellow);
    }
  }
}

@media screen and (min-width: 450px){
  .dropdown{
    top: 92px;
  }
}

@media screen and (min-width: 789px){
  .dropdown{
    display: none;
  }
}
</style>