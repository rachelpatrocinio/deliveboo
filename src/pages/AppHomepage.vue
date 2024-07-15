<template>
  <main>
    <AppHeroBanner></AppHeroBanner>
    <section class="restaurants py-5 h-100">
      <div class="container">
        <div class="row">
        <!-- TYPES -->
          <div class="col-12 col-md-4 col-lg-2 d-flex flex-column types mb-2" id="types">
            <ul class="p-0 m-0 types-content">
              <li class="text-center my-2">
                <h3>Filtra Tipologie</h3>
              </li>
              <li class="py-2 col">
                <ul class="d-flex flex-wrap p-0">
                  <li v-for="type in types" :key="type.id" class="col-6 col-md-12 my-2 px-2 text-white">
                    <input class="pointer d-none checkbox" :id="type.name" :value="type.name" v-model="type_names"
                      type="checkbox">
                    <label :class="type.name" class="type-badge" :for="type.name">{{ type.name }}</label>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div class="col-12 col-md-8 col-lg-10">
            <ul class="p-0 m-0 row flex-wrap">
              <li v-for="restaurant in restaurants" :key="restaurant.id" class="col-12 col-md-6 col-lg-4 mb-3 p-2">
                <AppCard :restaurant="restaurant" @click="store.windowScroll"></AppCard>
              </li>
            </ul>
            <div v-if="lastPage > 1">
              <div class="d-flex gap-2 justify-content-center">
                <p v-for="n in lastPage" @click="changePage(n)" :key="n"
                  :class="n === currentPage ? 'bg-green text-white' : 'bg-white'" class="cursor-pointer btn width-btn">{{ n }}
                </p>
              </div>

            </div>
            <h2 class="text-center text-danger mt-5" v-if="restaurants.length === 0 && searchPerformed">Non ho trovato
              nessun ristorante!</h2>
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
      searchPerformed: false, // Indica se una ricerca è stata effettuata
      lastPage: null,
      currentPage: 1,
    };
  },
  methods: {
    // Recupera i ristoranti tramite l'API
    fetchRestaurants() {
      const params = {};
      params.page = this.currentPage
      if (this.type_names.length) {
        params.types = this.type_names.join(",");
      }
      axios
        .get(`http://127.0.0.1:${store.port}/api/restaurants`, { params })
        .then((res) => {
          this.restaurants = res.data.data; // Popola l'array dei ristoranti
          this.searchPerformed = true; // Indica che una ricerca è stata effettuata
          this.lastPage = res.data.last_page;
        })
        .catch((error) => {
          console.error("Errore nel recupero dei ristoranti:", error);
        });
    },
    //aggiorna i dati nel local storage se diversi da quelli salvati
    keepUp() {
      this.store.chart = localStorage.chart ? JSON.parse(localStorage.chart) : [];
      this.store.total_price = localStorage.total_price ? JSON.parse(localStorage.total_price) : 0;
      this.store.total_qty = localStorage.total_qty ? JSON.parse(localStorage.total_qty) : 0;
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
    },
    changePage(n) {
      if (n === this.currentPage) return
      this.currentPage = n;
      this.store.pageScroll();
      this.fetchRestaurants()
    }
  },
  created() {
    // Richiama le funzioni dei methods per la stampa in pagina
    this.fetchTypes()
    this.fetchRestaurants()
  },
  mounted() {
    this.keepUp();
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
@use '../style/general';

.types {
  .types-content {
    border: 2px solid var(--color-darkgreen);
    border-radius: 10px;
  }

  li .type-badge {
    font-weight: 600;
    margin: 0 5px;

    &:hover {
      transform: scale(1.1);
    }

  }
}

.checkbox:checked+label {
  border: 4px solid white;
}
</style>