<template>
  <main>
    <AppHeroBanner></AppHeroBanner>
    <section class="restaurants py-5 h-100">
      <div class="container">
        <div class="row">
          <div class="col-2 d-flex flex-column types">
            <ul class="p-0 m-0">
              <li v-for="type in types" :key="type.id" class="p-3">
                <label :for="type.name">{{ type.name }}</label>
                <input class="d-none" :id="type.name" :value="type.name" v-model="type_ids" type="checkbox">
              </li>
            </ul>       
          </div>
          <div class="col-10">
          </div>
        </div>
      </div>
    </section>


    <!-- <section class="h-100">
      <div class="container py-5 h-100">
        <div>
          <h1>Ristoranti</h1>
          <div>
            <label v-for="type in types" :key="type.id">
              <input type="checkbox" :value="type.name" v-model="type_ids" />
              {{ type.name }}
            </label>
          </div>
          <button @click="fetchRestaurants">Filtra Ristoranti</button>
          <ul>
            <li v-for="restaurant in restaurants" :key="restaurant.id">
              {{ restaurant.name }}
            </li>
          </ul>
          <p v-if="restaurants.length === 0 && searchPerformed">Non ho trovato nessun ristorante</p>
        </div>
      </div>
    </section> -->
    
  </main>
</template>

<script>
import axios from "axios";
import AppHeroBanner from "../components/AppHeroBanner.vue";


export default {
  components: {
    AppHeroBanner,
  },
  data() {
    return {
      restaurants: [], // Array vuoto da popolare con la chiamata axios
      types: [], // Array vuoto da popolare con la chiamata axios
      type_ids: [], // Salva gli ids delle checkbox
      searchPerformed: false // Indica se una ricerca è stata effettuata
    };
  },
  methods: {
    // Recupera i ristoranti tramite l'API
    fetchRestaurants() {
      const params = {};
      if (this.type_ids.length) {
        params.types = this.type_ids.join(",");
      }
      axios
        .get("http://127.0.0.1:8000/api/restaurants", { params })
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
      axios
        .get("http://127.0.0.1:8000/api/types")
        .then((res) => {
          console.log("Dati tipi ricevuti:", res.data); // Aggiungi questo log
          this.types = res.data.types; // Popola l'array delle tipologie
        })
        .catch((error) => {
          console.error("Errore nel recupero delle tipologie:", error);
        });
    },
  },
  created() {
    // Richiama le funzioni dei methods per la stampa in pagina
    this.fetchTypes();
  },
};
</script>

<style lang="scss" scoped>
.types{
  border: 2px solid var(--color-darkgreen);
  border-radius: 10px;

  li{
    font-weight: 600;
    &:hover{
      color: var(--color-darkgreen);
    }
  }
}
</style>