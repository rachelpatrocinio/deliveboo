<template>
    <div class="container position-relative py-3">
        <div class="row">
            <div class="mb-4">
                    <button class="btn" @click="goBack">Torna Indietro</button>
                </div>
            <div class="col-9">
                <div class="row">
                    <div class="col-12 text-center" v-for="(dish, index) in restaurant.dishes">
                        <div class="card d-flex flex-row p-4 mb-2">
                            <div class="card-title w-25">
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
                                <div class="w-25" v-if="qtyBox === false || index !== idCard">
                                    <div class="btn" @click="openChart(index)">
                                    Scegli il piatto
                                    </div>
                                </div>

                                <div class="quantity my-4" v-if="qtyBox === true && index === idCard">
                                    <div>
                                        <div>
                                            <span class="" @click="decrement(dish)">- </span>
                                            <input class="item-number" type="text" disabled v-model="dish.qty" />
                                            <span class="" @click="increment(dish)"> +</span>
                                        </div>
                                    </div>

                                    <div class="d-flex gap-2 mt-2">
                                        <button class="btn" @click="addToChart(dish)">
                                        AGGIUNGI
                                        </button>
                                        <button class="btn" @click="qtyBox = false">
                                            Annulla
                                        </button>
                                    </div>
                                </div>
                                <div class="h3" v-if="qtyError === true && index === idCard">
                                    Scegli una quantità!!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="summary p-3" v-if="store.chart.length !== 0">
                    <h3 class="mb-4"> Riepilogo Ordine</h3>
                    <ul class="card-body">
                        <li class="d-flex justify-content-between" v-for="cartDish in store.chart">
                            <p>
                                {{ cartDish.qty }}x {{ cartDish.name }}
                            </p>
                            <p>
                                {{ partialTotal(cartDish.price, cartDish.qty).toFixed(2) }} €
                            </p>    
                        </li>
                    </ul>
                    <RouterLink to="/carrello">
                        <button class="btn">
                            VAI AL CARRELLO
                        </button>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div v-if="message === true" class="one-restaurant-message text-center p-5 d-flex justify-content-center">
            <div class="modal-message p-5">
                <h4>Puoi selezionare piatti da un solo ristorante alla volta!</h4>
                <div class="d-flex gap-3 justify-content-center">
                    <div class="btn btn-dark" @click="emptChart()">Svuota il carrello </div>
                    <div class="btn" @click="message = false">Annulla</div>
                </div>
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
            // chiamata parametrica del singolo ristorante
            axios
                .get(`http://127.0.0.1:${store.port}/api/restaurants/` + this.$route.params.slug)
                .then((res) => {
                    this.restaurant = res.data.restaurant;
                    // console.log(this.restaurant);
                    this.restaurant.dishes.forEach((dish) => {
                        dish.qty = 0;
                    });
                    console.log(this.restaurant);
                });
        },
        goBack() {
            this.$router.back();
        },
        emptChart(){
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
            this.totalQty();
        },
        decrement(dish) {
            if (dish.qty >= 2) dish.qty--;
            this.updateQty(dish);
            this.totalQty();
        },
        // Debug
        updateQty(dish) {
            console.log(`${dish.name}: ${dish.qty}`);
        },
        //funzione per il salvataggio del carrello nel localStorage come stringa [JSON.stringify()]
        keep() {
            localStorage.chart = JSON.stringify(this.store.chart);
        },
        openChart(id){
            this.idCard = id;
            if(this.qtyBox !== true){
                this.qtyBox = true;
            }
            else{
                this.qtyBox = false;
            }
        },
        addToChart(dish) {
            if(dish.qty > 0){
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
                else{
                    this.message = true;
                }
                this.keep();
            }
            else {
                this.qtyError = true
            }
        }
    },
    created() {
        this.fetchRestaurant();
        this.totalQty();
    }
};
</script>

<style lang="scss" scoped>
.item-number {
    width: 50px;
    text-align: center;
}

.quantity {

    // top: 0;
    // bottom: 0;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // background-color: rgba(0, 0, 0, 0.506);

    // .quantity-content{
    //     width: 50%;
    //     background-color: white;
    // }

    span {
        cursor: pointer;
    }
}

.dish-img {
    aspect-ratio: 1/1;
    object-fit: cover;
    width: 150px;
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
</style>
