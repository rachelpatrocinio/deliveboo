<template>
    <section class="h-100">
      <div class="container py-5 h-100">
        <div>
          <h1>Ristoranti</h1>
          <div>
            <label v-for="type in types" :key="type.id">
              <input type="checkbox" :value="type.name" v-model="type_names"/>
              {{ type.name }}
            </label>
          </div>
          <!-- <button @click="fetchRestaurants">Filtra Ristoranti</button> -->
          <ul>
            <li v-for="restaurant in restaurants" :key="restaurant.id">
              {{ restaurant.name }}
            </li>
          </ul>
          <p v-if="restaurants.length === 0 && searchPerformed">Non ho trovato nessun ristorante</p>
        </div>
      </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      restaurants: [], // Array vuoto da popolare con la chiamata axios
      types: [], // Array vuoto da popolare con la chiamata axios
      type_names: [], // Salva gli ids delle checkbox
      searchPerformed: false // Indica se una ricerca è stata effettuata
    };
  },
  methods: {
    // Recupera i ristoranti tramite l'API
    fetchRestaurants() {
      const params = {};
      if (this.type_names.length) {
        params.types = this.type_names.join(",");
      }
      axios
        .get("http://127.0.0.1:8000/api/restaurants", {params})
        .then((res) => {
          this.restaurants = res.data; // Popola l'array dei ristoranti
          this.searchPerformed = true; // Indica che una ricerca è stata effettuata
        })
        .catch((error) => {
          console.error("Errore nel recupero dei ristoranti:", error);
        });
    },
    // Recupera le tipologie tramite l'API
    fetchTypes() {
      axios.get("http://127.0.0.1:8000/api/types")
        .then((res) => {
          this.types = res.data.types; // Popola l'array delle tipologie
        })
        .catch((error) => {
          console.error("Errore nel recupero delle tipologie:" + error);
        })
      }
  },
  created() {
    // Richiama le funzioni dei methods per la stampa in pagina
    this.fetchTypes()
    this.fetchRestaurants()
  },
  watch: {

    type_names: {
      handler() {
        this.fetchRestaurants()
      }
    }

  }
}


</script>

<style>
/* Inserisci qui i tuoi stili */
</style>