<template>
  <div class="container py-5">
    <div class="row py-5">
      <h1 class="p-0">CARRELLO</h1>
      <table>
        <thead>
          <tr>
            <th>Piatto</th>
            <th>Quantità</th>
            <th>Prezzo</th>
            <th>Elimina</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dish, i) in store.chart" :key="i">
            <td>{{ dish.name }}</td>
            <td>{{ dish.qty }}</td>
            <td>€ {{ partialTotal(dish.price, dish.qty) }}</td>
            <td>
              <button class="btn delete-button" @click="deleteDish(i, price)">
                <img src="../../public/icons/bin.png" alt="Eliminazione" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  data() {
    return {
      store,
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

      // localStorage.removeItem(dish); // qui ritornano anche quando cambio rotta
      // localStorage.chart = localStorage.removeItem(dish); // si blocca tutto

      // const storage = localStorage.chart
      // storage.removeItem(dish); // non so perchè ma mi dice is not a function

      // localStorage.removeItem(localStorage.chart[dish]); // undefiened index
      // console.log(localStorage)
    },

    partialTotal(price, qty) {
      const total = price * qty;
      return total;
    },
  },

  mounted() {
    // console.log(this.store.chart)
    
    //richiamo il carrello e se è stato riempito, allora mi restituisce un oggetto [JSON.parse()], altrimenti array vuoto
    this.store.chart = localStorage.chart ? JSON.parse(localStorage.chart) : [];

  },
};
</script>

<style lang="scss" scoped></style>
