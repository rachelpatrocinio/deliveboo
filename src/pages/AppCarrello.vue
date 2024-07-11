<template>
  <div class="container py-5">
    <div class="mb-5">
      <button class="btn btn-orange" @click="goBack()">
        TORNA INDIETRO
      </button>
    </div>
    <div class="row bg-green text-white p-5">
      <div class="d-flex justify-content-between">
        <h1 class="p-0">CARRELLO</h1>
        <div v-if="store.chart.length > 0" class="my-4">
          <div class="btn btn-dark" @click="emptChart()">Svuota il carrello </div>
        </div>
      </div>
      <ul class="mt-5" v-if="store.chart.length > 0">
        <li class="d-flex" v-for="(dish, i) in store.chart" :key="i">
          <p class="col-4">
            {{ dish.qty }}x {{ dish.name }}
          </p>
          <div class="col-2">
            <span class="pointer" @click="decrement(dish)">- </span>
            <span class="mx-4">{{ dish.qty }}</span>
            <span class="pointer" @click="increment(dish)"> +</span>
          </div>
          <div class=" d-flex col-2">
            <p>€ {{ dish.price }}</p>
          </div>
          <div class="col-2 price">
            <p>€ {{ partialTotal(dish.price, dish.qty).toFixed(2) }}</p>
          </div>
          <div class="col-2 text-end">
            <div class="delete-button pointer" @click="deleteDish(i, price)">
              <img src="../../public/icons/bin.png" alt="Eliminazione" />
            </div>
          </div>
        </li>
      </ul>

      <hr>
      <div v-if="store.chart.length > 0" class="my-4 d-flex justify-content-between">
        <h3>Totale: € {{ store.total_price.toFixed(2) }}</h3>
        <a v-if="store.chart.length > 0" href="/pagamento" class="btn btn-orange">VAI AL PAGAMENTO</a> <!-- NON TOCCARE -->
      </div>

      <div v-if="store.chart.length === 0" class="py-5">
        <h3>Il tuo carrello è vuoto</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  data() {
    return {
      store
    };
  },
  methods: {
    //funzione per il salvataggio del carrello nel localStorage
    saveChart() {
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
      this.store.chart = localStorage.chart ? JSON.parse(localStorage.chart) : [];
      this.store.total_price = localStorage.total_price ? JSON.parse(localStorage.total_price) : 0;
      this.store.total_qty = localStorage.total_qty ? JSON.parse(localStorage.total_qty) : 0;
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
        console.log(singleDish);
        const singleDishPrice = this.partialTotal(singleDish.price, singleDish.qty)
        this.store.total_price += singleDishPrice

        // recuperare restaurant_id
        const restaurant_id = singleDish.restaurant_id
        this.store.restaurant_id = restaurant_id
        console.log(this.store.restaurant_id)
      }
      localStorage.restaurant_id = JSON.stringify(this.store.restaurant_id);
      this.keep();
    },
    totalQty() {
      this.store.total_qty = 0;
      for (let i = 0; i < this.store.chart.length; i++) {
        const singleDish = this.store.chart[i];
        console.log(singleDish);
        const singleDishQty = singleDish.qty
        this.store.total_qty += singleDishQty
      }
      this.keep();
    },
    increment(dish) {
      dish.qty++;
      this.updateQty(dish);
      console.log(this.totalDishPrice);
      this.totalPrice();
      this.totalQty();
      this.keep();
    },
    decrement(dish) {
      if (dish.qty >= 2) dish.qty--;
      this.updateQty(dish);
      console.log(this.totalDishPrice);
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
    },
    // Debug
    updateQty(dish) {
      console.log(`${dish.name}: ${dish.qty}`);
    },
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
  }
};
</script>

<style lang="scss" scoped>
@use '../style/general';

.price {
  font-weight: 600;
}

</style>
