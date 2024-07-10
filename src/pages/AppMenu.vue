<template>
    <div class="container py-5">
        <div class="row py-5">
            <div v-if="restaurant.dishes.length === 0" class="card">
                <h3>Questo ristorante non ha ancora registrato piatti</h3>
            </div>
            <div class="col-4 text-center" v-for="(dish, index) in restaurant.dishes">
                <div class="card p-4">
                    <div class="card-header">
                        {{ dish.name }}
                    </div>
                    <div class="card-body">
                        <figure>
                            <img class="dish-img" :src="dish.thumb_url" :alt="`piatto ${dish.name}`" />
                        </figure>
                        <p>{{ dish.description_ingredients }}</p>
                        <p>€ {{ dish.price }}</p>
                        <div v-if="qtyBox === false || index !== idCard">
                            <div class="btn" @click="openChart(index)">
                                Scegli il piatto
                            </div>
                        </div>


                        <div class="quantity d-flex gap-3 my-4" v-if="qtyBox === true && index === idCard">
                            <!-- Abbellire bottoni -->
                            <div>
                                <div>
                                    <h5>Quantità</h5>
                                </div>
                                <div>
                                    <span class="" @click="decrement(dish)">- </span>
                                    <input class="item-number" type="text" disabled v-model="dish.qty" />
                                    <span class="" @click="increment(dish)"> +</span>
                                </div>
                            </div>

                            <button class="btn" @click="addToChart(dish)">
                                AGGIUNGI AL CARRELLO
                            </button>
                        </div>
                        <div class="h3" v-if="qtyError === true && index === idCard">
                            Scegli una quantità!!
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <button class="btn" @click="goBack">Torna Indietro</button>
            </div>
            <div v-if="message === true" class="card text-center my-4 p-2">
                <h3>Puoi selezionare piatti da un solo ristorante alla volta!</h3>
                <div class="d-flex gap-3 justify-content-center">
                    <div class="btn btn-dark" @click="emptChart()">Svuota il carrello </div>
                    <div class="btn" @click="message = false">Annulla</div>
                </div>
            </div>


            <div class="card my-3" v-if="store.chart.length !== 0">
                <div>
                    <h3>Riepilogo:</h3>
                </div>
                <ul class="card-body">
                    <li class="d-flex gap-3 mb-3" v-for="cartDish in store.chart">
                        <span><strong>Piatto: </strong>{{ cartDish.name }}</span>
                        <span>
                            <strong>Quantità: </strong>
                            <span class="" @click="decrement(cartDish)">- </span>
                            {{ cartDish.qty }}
                            <span class="" @click="increment(cartDish)"> +</span>
                        </span>
                        <span><strong>Prezzo: </strong>{{ partialTotal(cartDish.price, cartDish.qty).toFixed(2) }}
                            €</span>
                    </li>
                    <li class="mb-5">
                        <h5>Totale carrello: {{ store.total_price.toFixed(2) }}</h5>
                    </li>
                    <li class="d-flex gap-3">
                        <div>
                            <RouterLink class="btn" to="/carrello">VAI AL CARRELLO</RouterLink>
                        </div>

                        <div class="btn btn-dark" @click="emptChart()">Svuota il carrello </div>
                    </li>
                </ul>
            </div>
            <div class="card my-3" v-if="store.chart.length === 0">
                <h3>Il tuo carrello è vuoto</h3>
            </div>
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
            idCard: ''

        };
    },
    methods: {
        fetchRestaurant() {
            axios
                .get(`http://127.0.0.1:${store.port}/api/restaurants/` + this.$route.params.slug)
                .then((res) => {
                    this.restaurant = res.data.restaurant;
                    this.restaurant.dishes = this.restaurant.dishes.filter(dish => dish.visible === 1);
                    this.restaurant.dishes.forEach((dish) => {
                        dish.qty = 1;
                    });
                    console.log(this.restaurant)
                })
                .catch((error) => {
                    console.error("There was an error fetching the restaurant data!", error);
                });
        },
        goBack() {
            this.$router.back();
        },
        emptChart() {
            this.store.chart = [];
            this.message = false;
            localStorage.chart = JSON.stringify(this.store.chart);
        },
        increment(dish) {
            dish.qty++;
            this.updateQty(dish);
            this.totalPrice();
        },

        decrement(dish) {
            if (dish.qty >= 2) dish.qty--;
            this.updateQty(dish);
            this.totalPrice();
        },
        // Debug
        updateQty(dish) {
            console.log(`${dish.name}: ${dish.qty}`);
        },

        //funzione per il salvataggio del carrello nel localStorage come stringa [JSON.stringify()]
        keep() {
            localStorage.chart = JSON.stringify(this.store.chart);
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
            }
        },
        openChart(id) {
            this.idCard = id;
            if (this.qtyBox !== true) {
                this.qtyBox = true;
            }
            else {
                this.qtyBox = false;
            }
        },
        addToChart(dish) {
            if (dish.qty > 0) {
                this.qtyError = false
                // Controlla se il piatto è già nel carrello
                let cartDish = this.store.chart.find((item) => item.id === dish.id);


                if (cartDish) {
                    // Se è presente, incrementa la quantità
                    cartDish.qty += dish.qty;
                    this.message = false;
                    this.qtyBox = false;
                } else if (this.store.chart.length === 0 || this.store.chart.every(item => item.restaurant_id === dish.restaurant_id)) {
                    // Altrimenti aggiungi il piatto al carrello
                    this.store.chart.push({ ...dish });

                    this.message = false;
                    this.qtyBox = false;
                }
                else {
                    this.message = true;
                }
                this.keep();
                this.totalPrice();
            }
            else {
                this.qtyError = true
            }

        }
    },
    created() {
        this.fetchRestaurant();
    },
};
</script>

<style lang="scss" scoped>
.item-number {
    width: 50px;
    text-align: center;
}

.quantity {
    span {
        cursor: pointer;
    }
}

.dish-img {
    aspect-ratio: 1/1;
    object-fit: cover;
}

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
