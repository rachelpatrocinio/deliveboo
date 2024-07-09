<template>
  <div class="container py-5">
    <div class="row py-5">
      <h1 class="p-0">CARRELLO</h1>
      <div v-if="store.chart.length > 0" class="my-4 text-end">
        <div class="btn btn-dark" @click="emptChart()">Svuota il carrello </div>
      </div>
      <table v-if="store.chart.length > 0">
        <thead>
          <tr>
            <th>Piatto</th>
            <th>Quantità</th>
            <th>Prezzo unità</th>
            <th>Prezzo totale</th>
            <th>Elimina</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dish, i) in store.chart" :key="i">
            <td>{{ dish.name }}</td>
            <td>
              <!-- {{ dish.qty }} -->
              <span class="" @click="decrement(dish)">- </span>
              <span>{{ dish.qty }}</span>
              <span class="" @click="increment(dish)"> +</span>
            </td>
            <td>€ {{ dish.price }}</td>
            <td>€ {{ partialTotal(dish.price, dish.qty).toFixed(2) }}</td>
            <td>
              <button class="btn delete-button" @click="deleteDish(i, price)">
                <img src="../../public/icons/bin.png" alt="Eliminazione" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="store.chart.length > 0" class="my-4">
        <h3>Totale dell'ordine: € {{ store.total_price.toFixed(2) }}</h3>
      </div>
      <div v-if="store.chart.length === 0">
        <h3>Il tuo carrello è vuoto</h3>
      </div>
      <RouterLink v-if="store.chart.length > 0" to="/pagamento">VAI AL PAGAMENTO</RouterLink>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  data() {
    return {
      store,
      // total: 0
      // partialTotal = 0
    };
  },
  methods: {
    //funzione per il salvataggio del carrello nel localStorage
    saveChart() {
      localStorage.chart = JSON.stringify(this.store.chart);
    },
    deleteDish(dish) {
      this.store.chart.splice(dish, 1);

      localStorage.chart = JSON.stringify(this.store.chart);

      this.totalPrice();
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
    totalPrice(){
      this.store.total_price = 0;
      for(let i = 0; i < this.store.chart.length; i++){
        const singleDish = this.store.chart[i];
        console.log(singleDish);
        const singleDishPrice = this.partialTotal(singleDish.price, singleDish.qty)
        this.store.total_price += singleDishPrice
      }
    },
    increment(dish) {
        dish.qty++;
        this.updateQty(dish);
        console.log(this.totalDishPrice);
        this.totalPrice()
    },
    decrement(dish) {
        if (dish.qty >= 2) dish.qty--;
        this.updateQty(dish);
        console.log(this.totalDishPrice);
        this.totalPrice()
    },
    emptChart(){
            this.store.chart = [];
            localStorage.chart = JSON.stringify(this.store.chart);
            this.totalPrice()
        },
    // Debug
    updateQty(dish) {
        console.log(`${dish.name}: ${dish.qty}`);
    }
  },
  mounted() {
    // console.log(this.store.chart)
    
    //richiamo il carrello e se è stato riempito, allora mi restituisce un oggetto [JSON.parse()], altrimenti array vuoto
    this.store.chart = localStorage.chart ? JSON.parse(localStorage.chart) : [];
    this.totalPrice();
  },
//   watch: {

// total: {
//   handler() {
//     this.totalPrice()
//   }
// }

// }
};
</script>

<style lang="scss" scoped>
.btn {
    background-color: var(--color-orange);
    color: var(--color-dark);
    font-weight: 600;

    &:hover {
        transform: scale(1.1);
    }
}

.btn-dark {
    background-color: var(--color-dark);
    color: var(--color-yellow);
    font-weight: 600;

    &:hover {
        transform: scale(1.1);
    }
    
}
</style>
