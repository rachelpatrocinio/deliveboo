<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      restaurants: [], //array vuoto da popolare con la chiamata axios
      types: [], //array vuoto da popolare con la chiamata axios

      type_ids: [], //salvare gli ids delle checkbox
    };
  },

  methods: {
    //recupero i ristoranti tramite l'api
    fetchRestaurants() {
      const params = {};
      if (this.type_ids.length) {
        params.types = this.type_ids.join(",");
      }
      axios
        .get("http://127.0.0.1:8000/api/restaurants", { params })
        .then((res) => {
          //   console.log(res.data.restaurants);

          this.restaurants = res.data.restaurants; //popolo l'array dei ristoranti
        });
    },
    //recupero le tipologie tramite l'api
    fetchTypes() {
      axios.get("http://127.0.0.1:8000/api/types").then((res) => {
        // console.log(res.data.types);

        this.types = res.data.types; //popolo l'array delle tipologie
      });
    },

    // fitered restaurant
    getIdType(index) {
      this.type_ids.push(index);
      //   console.log("n. " + index);
      //   console.log(this.type_ids);
    },
  },
  created() {
    //richiamo le funzioni dei methods per la stampa in pagina
    // this.fetchRestaurants();
    this.fetchTypes();
  },
};
</script>

<template>
  <main>
    <section class="h-100">
      <div class="container py-5 h-100">
        <div>
          <h1>Ristoranti</h1>
          <div>
            <label v-for="type in types" :key="type">
              <input type="checkbox" :value="type" v-model="type_ids" />
              {{ type.name }}
            </label>
          </div>
          <button @click="fetchRestaurants()">Filtra Ristoranti</button>
          <ul>
            <li v-for="restaurant in restaurants" :key="restaurant.id">
              {{ restaurant.name }} - {{ restaurant.slug }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<style></style>
