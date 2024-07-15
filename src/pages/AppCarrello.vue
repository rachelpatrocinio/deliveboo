<template>
  <div class="container py-5">
    <div class="py-5">
      <button class="btn btn-orange back-btn me-3" @click="goBack()">
        <img src="../../../public/icons/back-button.png" alt="" />
      </button>
      <RouterLink to="/">
        <button class="btn btn-green">LISTA RISTORANTI</button>
      </RouterLink>
    </div>
    <div class="row bg-green text-white p-5">
      <div class="d-flex flex-wrap justify-content-between">
        <h1 class="p-0">CARRELLO</h1>
        <div
          v-if="store.chart.length > 0"
          class="my-md-4 col-12 col-md-4 text-md-end"
        >
          <div class="btn btn-dark" @click="message = true">
            Svuota il carrello
          </div>
        </div>
      </div>
      <ul class="mt-5" v-if="store.chart.length > 0">
        <li class="d-flex py-2" v-for="(dish, i) in store.chart" :key="i">
          <div class="col-2 d-md-flex align-items-center">
            <img
              class="pointer"
              src="../../public/icons/minus-sign.png"
              alt=""
              @click="decrement(dish)"
            />
            <span class="mx-4 d-none d-md-block">{{ dish.qty }}</span>
            <img
              class="pointer"
              src="../../public/icons/plus.png"
              @click="increment(dish)"
            />
          </div>
          <p class="col-6 col-md-4 m-0">{{ dish.qty }}x {{ dish.name }}</p>
          <div class="d-flex col-2 d-none d-md-block">
            <p class="m-0">€ {{ dish.price }}</p>
          </div>
          <div class="col-3 col-md-2 price">
            <p class="m-0">
              € {{ partialTotal(dish.price, dish.qty).toFixed(2) }}
            </p>
          </div>
          <div class="col-1 col-md-2 text-end">
            <div class="delete-button" @click="deleteDish(i, price)">
              <img src="../../public/icons/bin.png" alt="Eliminazione" />
            </div>
          </div>
        </li>
      </ul>

      <hr />
      <div
        v-if="store.chart.length > 0"
        class="my-4 d-flex justify-content-between"
      >
        <div class="col-auto me-3">
          <h4>Totale</h4>
          <p class="fs-4">€ {{ store.total_price.toFixed(2) }}</p>
        </div>
        <div class="col-auto">
          <a
            v-if="store.chart.length > 0"
            href="/pagamento"
            class="btn btn-orange"
            >VAI AL PAGAMENTO</a
          >
        </div>
        <!-- NON TOCCARE -->
      </div>

      <div v-if="store.chart.length === 0" class="py-5">
        <h3>Il tuo carrello è vuoto</h3>
      </div>
    </div>

    <div
      v-if="message === true"
      class="delete-cart text-center p-5 d-flex justify-content-center"
    >
      <div class="modal-message p-5 col-12 col-md-6">
        <h4 class="text-danger">Sei sicuro di voler svuotare il carrello?</h4>
        <div class="d-flex gap-3 flex-wrap justify-content-center py-3">
          <div class="btn btn-dark col-12 col-md-6" @click="emptChart()">
            Svuota il carrello
          </div>
          <div class="btn btn-orange col-12 col-md-6" @click="message = false">
            Annulla
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  data() {
    return {
      store,
      message: false,
    };
  },
  methods: {
    //funzione per il salvataggio del carrello nel localStorage
    saveChart() {
      localStorage.setItem("chart", this.store.chart);
      localStorage.chart = JSON.stringify(this.store.chart);
    },
    // salva i dati nel local storage
    keep() {
      localStorage.chart = JSON.stringify(this.store.chart);
      localStorage.total_price = JSON.stringify(this.store.total_price);
      localStorage.total_qty = JSON.stringify(this.store.total_qty);
    },
    //aggiorna i dati nel local storage se diversi da quelli salvati
    keepUp() {
      this.store.chart = localStorage.chart
        ? JSON.parse(localStorage.chart)
        : [];
      this.store.total_price = localStorage.total_price
        ? JSON.parse(localStorage.total_price)
        : 0;
      this.store.total_qty = localStorage.total_qty
        ? JSON.parse(localStorage.total_qty)
        : 0;
    },
    deleteDish(dish) {
      this.store.chart.splice(dish, 1);

      localStorage.chart = JSON.stringify(this.store.chart);

      this.totalPrice();
      this.totalQty();
      this.keep();
      // localStorage.removeItem(dish); // qui ritornano anche quando cambio rotta
      // localStorage.chart = localStorage.removeItem(dish); // si blocca tutto

      // const storage = localStorage.chart
      // storage.removeItem(dish); // non so perchè ma mi dice is not a function

      // localStorage.removeItem(localStorage.chart[dish]); // undefiened index
      // console.log(localStorage)
    },
    partialTotal(price, qty) {
      const total = price * qty;
      // this.totalDishPrice.push(total);
      // console.log(this.totalDishPrice)
      return total;
    },
    totalPrice() {
      this.store.total_price = 0;
      for (let i = 0; i < this.store.chart.length; i++) {
        const singleDish = this.store.chart[i];
        // console.log(singleDish);
        const singleDishPrice = this.partialTotal(
          singleDish.price,
          singleDish.qty
        );
        this.store.total_price += singleDishPrice;

        // recuperare restaurant_id
        const restaurant_id = singleDish.restaurant_id;
        this.store.restaurant_id = restaurant_id;
        // console.log(this.store.restaurant_id)
      }
      localStorage.restaurant_id = JSON.stringify(this.store.restaurant_id);
      this.keep();
    },
    totalQty() {
      this.store.total_qty = 0;
      for (let i = 0; i < this.store.chart.length; i++) {
        const singleDish = this.store.chart[i];
        // console.log(singleDish);
        const singleDishQty = singleDish.qty;
        this.store.total_qty += singleDishQty;
      }
      this.keep();
    },
    increment(dish) {
      dish.qty++;
      // this.updateQty(dish);
      // console.log(this.totalDishPrice);
      this.totalPrice();
      this.totalQty();
      this.keep();
    },
    decrement(dish) {
      if (dish.qty >= 2) dish.qty--;
      // this.updateQty(dish);
      // console.log(this.totalDishPrice);
      this.totalPrice();
      this.totalQty();
      this.keep();
    },
    emptChart() {
      this.store.chart = [];
      localStorage.chart = JSON.stringify(this.store.chart);
      this.totalPrice();
      this.totalQty();
      this.keep();
      this.message = false;
    },
    // Debug
    // updateQty(dish) {
    //   console.log(`${dish.name}: ${dish.qty}`);
    // },
    goBack() {
      this.$router.back();
    },
  },
  mounted() {
    // console.log(this.store.chart)

    //richiamo il carrello e se è stato riempito, allora mi restituisce un oggetto [JSON.parse()], altrimenti array vuoto
    this.keepUp();
    this.totalPrice();
    this.totalQty();
  },
};
</script>

<style lang="scss" scoped>
@use "../style/general";

.price {
  font-weight: 600;
}

.delete-button {
  cursor: pointer;
}

.delete-cart {
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.734);

  .modal-message {
    // width: 40%;
    background-color: white;
  }
}

.pointer {
  margin: 0 3px;
  width: 14px;
  height: 14px;
  background-color: var(--color-orange);
  padding: 2px;
  border-radius: 99px;
}
</style>
