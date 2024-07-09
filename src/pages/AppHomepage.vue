<template>
  <main>
    <AppHeroBanner></AppHeroBanner>
    <section class="restaurants py-5 h-100">
      <div class="container">
        <div class="row">

          <div class="col-2 d-flex flex-column types">
            <ul class="p-0 m-0">
              <li v-for="type in types" :key="type.id" class="p-3 d-flex justify-content-between">
                <label :for="type.name">{{ type.name }}</label>
                <input :id="type.name" :value="type.name" v-model="type_names" type="checkbox">
              </li>
            </ul>       
          </div>

          <div class="col-10">
            <ul class="p-0 m-0 d-flex flex-wrap">
              <li v-for="restaurant in restaurants" :key="restaurant.id" class="col-4 mb-3 p-2">
                <AppCard :restaurant="restaurant"></AppCard>
              </li>
            </ul>
            <h2 v-if="restaurants.length === 0 && searchPerformed">Non ho trovato nessun ristorante</h2>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script>
import axios from "axios";
import AppHeroBanner from "../components/AppHeroBanner.vue";
import AppCard from "../components/AppCard.vue";
import { store } from "../store.js";



export default {
  components: {
    AppHeroBanner,
    AppCard
  },
  data() {
    return {
      store,
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
        .get(`http://127.0.0.1:${store.port}/api/restaurants`, {params})
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
      axios.get(`http://127.0.0.1:${store.port}/api/types`)
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

<style lang="scss" scoped>
.types{
  ul{
    border: 2px solid var(--color-darkgreen);
    border-radius: 10px;
  }

  li{
    font-weight: 600;
    &:hover{
      color: var(--color-darkgreen);
    }
  }
}
</style>