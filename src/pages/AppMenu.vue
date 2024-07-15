<template>
  <div class="container position-relative py-5">
    <div class="row py-5">
      <div class="mb-4">
        <button class="btn btn-orange mb-3 back-btn" @click="goBack">
          <img src="../../../public/icons/back-button.png" alt="" />
        </button>
      </div>
      <div>
        <h1 class="text-center text-md-start">{{ restaurant.name }}</h1>
      </div>
      <div class="col-12 col-md-8 col-lg-10 d-flex flex-wrap">
        <figure class="w-25 mt-2 mb-5">
            <img
              v-if="restaurant.thumb !== null"
              :src="restaurant.thumb_url"
              alt="Foto Ristorante"
            />
            <img v-else src="../../../public/logo.png" alt="" class="img">
        </figure>
        <img class="map mt-3 ms-4" src="../../../public/icons/map.png" alt="map">
        <h6 class="mt-4 ms-2">
          {{ restaurant.address }}
        </h6>
      </div>
      <div class="col-12 col-md-8">
        <div class="row">
          <div
            class="col-12 text-center"
            v-for="(dish, index) in restaurant.dishes"
          >
            <div class="card d-flex flex-column flex-md-row p-4 mb-2">
              <div class="card-header col-12 col-md-4">
                <h5>{{ dish.name }}</h5>
                <figure v-if="dish.thumb_url">
                  <img
                    class="dish-img"
                    :src="dish.thumb_url"
                    alt="Foto Piatto"
                  />
                </figure>
                <figure v-else>
                  <img
                    class="dish-img"
                    src="../../../public/logo.png"
                    alt="Foto Piatto"
                  />
                </figure>
              </div>
              <div
                class="card-body d-flex flex-wrap flex-md-column flex-lg-row justify-content-between align-items-center text-center"
              >
                <div class="col-12 col-md-8">
                  <p class="ingredients d-none d-md-block">
                    {{ dish.description_ingredients }}
                  </p>
                  <p>€ {{ dish.price }}</p>
                </div>
                <div class="quantity col-12 col-md-4">
                  <div class="d-flex justify-content-center gap-2 mt-md-2">
                    <button class="btn btn-orange" @click="addToChart(dish)">
                      AGGIUNGI
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 my-4 my-md-0">
        <div class="summary p-3">
          <h3 class="mb-4">Riepilogo Ordine</h3>
          <ul class="card-body">
            <li class="text-center" v-if="store.chart.length === 0">
              Non hai aggiunto nessun piatto nel carrello
            </li>
            <li
              class="d-flex justify-content-between flex-md-column flex-xl-row py-md-2"
              v-for="(cartDish, i) in store.chart"
              :key="i"
            >
              <!-- <div class="d-flex justify-content-between"> -->
              <div class="decinc py-2 d-flex gap-lg-2">
                <img
                  class="pointer"
                  src="../../public/icons/minus-sign.png"
                  alt=""
                  @click="decrement(cartDish)"
                />
                <img
                  class="pointer"
                  src="../../public/icons/plus.png"
                  @click="increment(cartDish)"
                />
              </div>
              <p class="m-0 px-2">{{ cartDish.qty }}x {{ cartDish.name }}</p>
              <p class="my-0">
                {{ partialTotal(cartDish.price, cartDish.qty).toFixed(2) }} €
              </p>

              <!-- </div> -->
            </li>
          </ul>
          <hr />
          <div class="text-end">
            <h1 class="fs-4">Totale</h1>
            <h1 class="fs-6">{{ store.total_price.toFixed(2) }} €</h1>
          </div>
          <div
            class="d-flex justify-content-between flex-md-column align-items-center gap-2 mt-3"
          >
            <RouterLink to="/carrello">
              <button
                class="btn btn-orange d-block"
                @click="store.windowScroll"
              >
                VAI AL CARRELLO
              </button>
            </RouterLink>
            <button class="btn btn-dark d-block px-3" @click="emptChart()">
              Svuota il carrello
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="lastPage > 1">
      <div class="d-flex gap-2 justify-content-center">
        <p
          v-for="n in lastPage"
          @click="changePage(n)"
          :key="n"
          :class="n === currentPage ? 'bg-green text-white' : 'bg-white'"
          class="cursor-pointer btn width-btn"
        >
          {{ n }}
        </p>
      </div>
    </div>
    <div v-if="message === true"class="one-restaurant-message text-center p-5 d-flex justify-content-center">
      <div class="modal-message p-5 col-12 col-md-6">
        <h4>Puoi selezionare piatti da un solo ristorante alla volta!</h4>
        <div class="d-flex gap-3 flex-wrap justify-content-center py-3">
          <div class="btn btn-dark col-12 col-md-6" @click="newDishChart()">
            Svuota il carrello e aggiungi piatto
          </div>
          <div class="btn btn-orange col-12 col-md-6" @click="message = false">
            Annulla
          </div>
        </div>
      </div>
    </div>
    <div class="added p-3 text-success" v-if="add === true">
      <img src="../../public/icons/check.png" alt="">
      AGGIUNTO SUL CARRELLO
    </div>
  </div>
</template>
<script>
import { store } from "../store.js";
import axios from "axios";

export default {
  props: {
    restaurant: Object,
  },
  data() {
    return {
      store,
      restaurant: {},
      imgPath: "../../public/",
      message: false,
      qtyBox: false,
      qtyError: false,
      idCard: "",
      lastPage: null,
      currentPage: 1,
      add: false
    };
  },
  methods: {
    fetchRestaurant() {
      axios
        .get(
          `http://127.0.0.1:${store.port}/api/restaurants/` +
            this.$route.params.slug,
          {
            params: {
              page: this.currentPage,
            },
          }
        )
        .then((res) => {
          this.restaurant = res.data;
          this.lastPage = res.data.dishes.last_page;
          this.restaurant.dishes = this.restaurant.dishes.data.filter(
            (dish) => dish.visible === 1
          );
          this.restaurant.dishes.forEach((dish) => {
            dish.qty = 1;
          });

          // console.log(this.currentPage)
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the restaurant data!",
            error
          );
        });
    },
    changePage(n) {
      if (n === this.currentPage) return;
      this.currentPage = n;
      this.store.windowScroll();
      this.fetchRestaurant();
    },
    goBack() {
      this.$router.back();
    },
    emptChart() {
      this.store.chart = [];
      this.message = false;
      localStorage.chart = JSON.stringify(this.store.chart);
      this.totalQty();
      this.totalPrice();
      this.keep();
    },
    newDishChart() {
      this.store.chart = [this.store.diffDish];
      this.message = false;
      localStorage.chart = JSON.stringify(this.store.chart);
      this.totalQty();
      this.totalPrice();
      this.keep();
    },
    partialTotal(price, qty) {
      const total = price * qty;
      return total;
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
      this.totalPrice();
      this.totalQty();
      this.totalPrice();
      this.keep();
    },
    decrement(dish) {
      if (dish.qty >= 2) dish.qty--;
      // this.updateQty(dish);
      this.totalQty();
      this.totalPrice();
      this.keep();
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
      }
      this.keep();
    },
    // Debug
    // updateQty(dish) {
    //     console.log(`${dish.name}: ${dish.qty}`);
    // },
    //funzione per il salvataggio del carrello nel localStorage come stringa [JSON.stringify()]
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
    addToChart(dish) {
      if (dish.qty > 0) {
        this.qtyError = false;
        this.store.diffDish = dish;
        // Controlla se il piatto è già nel carrello
        let cartDish = this.store.chart.find((item) => item.id === dish.id);

        if (cartDish) {
          // Se è presente, incrementa la quantità
          cartDish.qty += dish.qty;
          this.message = false;
          this.qtyBox = false;
          this.totalQty();
        } else if (
          this.store.chart.length === 0 ||
          this.store.chart.every(
            (item) => item.restaurant_id === dish.restaurant_id
          )
        ) {
          // Altrimenti aggiungi il piatto al carrello
          this.store.chart.push({ ...dish });
          this.message = false;
          this.qtyBox = false;
          this.totalQty();
        } else {
          this.message = true;
        }
        // this.keep();
        this.totalPrice();
        this.keep();

        this.add = true;
        setTimeout(() => {
          this.add = false;
        }, 3000);

      } else {
        this.qtyError = true;
      }
    },
    close() {
      this.qtyBox = false;
      this.qtyError = false;
    },
  },
  created() {
    this.fetchRestaurant();
  },
  mounted() {
    this.keepUp();
    this.totalQty();
    this.totalPrice();
  },
};
</script>

<style lang="scss" scoped>
@use "../style/general";

.map{
    width: 25px;
    height: 25px;
}

.item-number {
  width: 50px;
  text-align: center;
}

.dish-img {
  aspect-ratio: 1/1;
  object-fit: cover;
}

.one-restaurant-message {
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

.summary {
  background-color: var(--color-green);
  border-radius: 10px;
  color: white;
}

.decinc {
  img {
    margin: 0 3px;
    width: 14px;
    background-color: var(--color-orange);
    padding: 2px;
    border-radius: 99px;
  }
}

.added{
  position: fixed;
  right: 30px;
  bottom: 100px;
  z-index: 99;
  background-color: white;
  border-radius: 10px;
  animation: slide-in-right 0.3s ease-in;
}

@keyframes slide-in-right{
    0%{
        opacity:0;
        transform: translateX(50px);
    }
    100%{
        opacity: 1;
        transform: translateX(0px);
    }
}
</style>
