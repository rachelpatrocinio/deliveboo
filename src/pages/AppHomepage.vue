<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      restaurants: [], //array vuoto da popolare con la chiamata axios
      types: [], //array vuoto da popolare con la chiamata axios
    };
  },

  methods: {
    //recupero i ristoranti tramite l'api
    fetchRestaurants() {
      axios.get("http://127.0.0.1:8000/api/restaurants").then((res) => {
        // console.log(res.data.restaurants);
        
        this.restaurants = res.data.restaurants; //popolo l'array dei ristoranti
      });
    },
    //rescupero le tipologie tramite l'api
    fetchTypes() {
      axios.get("http://127.0.0.1:8000/api/types").then((res) => {
        
        this.types = res.data.types; //popolo l'array delle tipologie
      });
    },
  },
  created() {
    //richiamo le funzioni dei methods per la stampa in pagina
    this.fetchRestaurants();
    this.fetchTypes();
  },
};
</script>

<template>
  <main>
    <section class="h-100">
      <div class="container py-5 h-100">
        <div
          class="row aling-items-center flex-column justify-content-center h-100"
        >
          <div class="col-auto text-center">
            <!-- <h1>Hello Vue <font-awesome-icon :icon="['fab', 'vuejs']" /></h1> -->
            <div v-for="restaurant in restaurants" :key="restaurant.id">
              <h1>
                {{ restaurant.name }}
              </h1>
            </div>
          </div>

          <div class="col-auto text-center">
            <!-- <h1>Hello Vue <font-awesome-icon :icon="['fab', 'vuejs']" /></h1> -->
            <div v-for="type in types" :key="type.id">
              <input type="checkbox" :value="type.id" name="type" id="type"/>
              <label for="type">
                {{ type.name }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style></style>
