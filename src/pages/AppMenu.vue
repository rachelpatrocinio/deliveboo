<template>
    <div class="container position-relative py-5">
        <div class="row py-5">
            <div class="mb-4">
                    <button class="btn btn-orange" @click="goBack">Torna Indietro</button>
                </div>
            <div class="col-8">
                <div class="row">
                    <div class="col-12 text-center" v-for="(dish, index) in restaurant.dishes">
                        <div class="card d-flex flex-row p-4 mb-2">
                            <div class="card-header w-25">
                                <h5>{{ dish.name }}</h5>
                                <figure>
                                    <img class="dish-img" :src="imgPath + dish.thumb" alt="Foto Piatto" />
                                </figure>
                            </div>
                            <div class="card-body d-flex justify-content-between align-items-center w-75 text-center">
                                <div class="w-75">
                                    <p class="ingredients">{{ dish.description_ingredients }}</p>
                                    <p>€ {{ dish.price }}</p>
                                </div>

                                <div class="quantity my-4">
                                    <div class="d-flex gap-2 mt-2">
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
            <div class="col-4">
                <div class="summary p-3">
                    <h3 class="mb-4"> Riepilogo Ordine</h3>
                    <ul class="card-body">
                        <li class="text-center" v-if="store.chart.length === 0"> Non hai aggiungo nessun piatto nel carrello</li>
                        <li class="d-flex justify-content-between" v-for="cartDish in store.chart">
                            <div class="d-flex justify-content-between">
                                <p class="decinc me-1">
                                    <img src="../../public/icons/minus-sign.png" alt="" @click="decrement(cartDish)">
                                    <img src="../../public/icons/plus.png" @click="increment(cartDish)">
                                </p>
                                <p>
                                    {{ cartDish.qty }}x {{ cartDish.name }}
                                </p>
                            </div>
                            <p>
                                {{ partialTotal(cartDish.price, cartDish.qty).toFixed(2) }} €
                            </p>  
                        </li>
                    </ul>
                    <hr>  
                    <div class="text-end">
                        <strong>
                            {{ store.total_price.toFixed(2)  }}€
                        </strong>
                    </div>
                    <div class="d-flex justify-content-between mt-3">
                        <RouterLink to="/carrello">
                            <button class="btn btn-orange">
                                VAI AL CARRELLO
                            </button>
                            </RouterLink>
                        <div class="btn btn-dark" @click="emptChart()">Svuota il carrello</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="message === true" class="one-restaurant-message text-center p-5 d-flex justify-content-center">
            <div class="modal-message p-5">
                <h4>Puoi selezionare piatti da un solo ristorante alla volta!</h4>
                <div class="d-flex gap-3 justify-content-center">
                    <div class="btn btn-dark" @click="emptChart()">Svuota il carrello </div>
                    <div class="btn btn-orange" @click="message = false">Annulla</div>
                </div>
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
            this.totalQty();
        },
        partialTotal(price, qty) {
            const total = price * qty;
            return total;
        },
        totalQty(){
            this.store.total_qty = 0;
            for(let i = 0; i < this.store.chart.length; i++){
                const singleDish = this.store.chart[i];
                console.log(singleDish);
                const singleDishQty = singleDish.qty
                this.store.total_qty += singleDishQty
            }
        },
        increment(dish) {
            dish.qty++;
            this.updateQty(dish);
            this.totalPrice();
            this.totalQty();
            this.totalPrice();
        },
        decrement(dish) {
            if (dish.qty >= 2) dish.qty--;
            this.updateQty(dish);
            this.totalQty();
            this.totalPrice();
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
        // Debug
        updateQty(dish) {
            console.log(`${dish.name}: ${dish.qty}`);
        },
        //funzione per il salvataggio del carrello nel localStorage come stringa [JSON.stringify()]
        keep() {
            localStorage.chart = JSON.stringify(this.store.chart);
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
                    this.totalQty();
                } else if(this.store.chart.length === 0 || this.store.chart.every(item => item.restaurant_id === dish.restaurant_id)){
                    // Altrimenti aggiungi il piatto al carrello
                    this.store.chart.push({ ...dish });
                    this.message = false;
                    this.qtyBox = false;
                    this.totalQty();
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
        },
        close(){
            this.qtyBox = false;
            this.qtyError = false;
        }
    },
    created() {
        this.fetchRestaurant();
    },
    mounted(){
        this.totalQty();
    }
};
</script>

<style lang="scss" scoped>
@use '../style/general';

.item-number {
    width: 50px;
    text-align: center;
}

.dish-img {
    aspect-ratio: 1/1;
    object-fit: cover;
    width: 150px;
}

.one-restaurant-message{
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right:0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.734);

    .modal-message{
        width: 40%;
        background-color: white;
    }
}

.summary{
    background-color: var(--color-green);
    border-radius: 10px;
    color: white;
}

.decinc{

    img{
        margin: 0 3px;
        width: 14px;
        background-color: var(--color-orange);
        padding: 2px;
        border-radius: 99px;
    }
}
</style>
