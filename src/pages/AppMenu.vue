<template>
    <div class="container py-5">
        <div class="row py-5">
            <div class="col-4 text-center" v-for="dish in restaurant.dishes">
                <div class="card p-4" >
                    <div class="card-title">
                        {{ dish.name }}
                    </div>
                    <div class="card-body">
                        <figure>
                            <img class="dish-img" :src="imgPath + dish.thumb" alt="Foto Piatto">
                        </figure>
                        <p>{{ dish.description_ingredients }}</p>
                        <div class="quantity">
                            <button class="deductButton" @click="decrement(dish)">-</button>
                            <input class="item-number" type="text" v-model="dish.qty">
                            <span class="addButton" @click="increment(dish)">+</span>
                        </div>
                        <button class="btn" @click="addToChart(dish)">AGGIUNGI AL CARRELLO</button>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <button class="btn" @click="goBack">Torna Indietro</button>
                <RouterLink to="/carrello">VAI AL CARRELLO</RouterLink>
            </div>
        </div>
    </div>

</template>
<script>
import {store} from '../store.js';
import axios from "axios";

export default {
    props:{
        restaurant: Object,
    },
    data() {
        return {
            store,
            restaurant: {},
            imgPath: '../../public/',
            // itemN: 0
        }
    },
    methods: {
        fetchRestaurant() { // chiamata parametrica del singolo ristorante
            axios
                .get("http://127.0.0.1:8000/api/restaurants/" + this.$route.params.slug)
                .then((res)=>{
                    this.restaurant = res.data.restaurant;
                    // console.log(this.restaurant);
                    this.restaurant.dishes.forEach(dish => {
                        dish.qty = 0;
                    });
                    console.log(this.restaurant)
                    
                })
        },
        goBack(){
            this.$router.back()
        },
        increment(dish){
            dish.qty++
            this.updateQty(dish)
        },
        decrement(dish){
            if(dish.qty !== 0)
            dish.qty--
            this.updateQty(dish);
        },
        // Debug
        updateQty(dish) {
            console.log(`${dish.name}: ${dish.qty}`);
        },

        //funzione per il salvataggio del carrello nel localStorage come stringa [JSON.stringify()]
        keep(){
            localStorage.chart = JSON.stringify(this.store.chart);
        },

        addToChart(dish){
            const dishAdd = { ...dish, qty: dish.qty };
            this.store.chart.push(dishAdd)
            this.keep()
            console.log(this.store.chart)
        }
    },
    created() {
    this.fetchRestaurant();
    }
}
</script>
    
<style lang="scss" scoped>

.item-number{
    width: 50px;
    text-align: center;
}

.quantity{
    span{
        cursor: pointer;
    }
}

.dish-img{
    aspect-ratio: 1/1;
    object-fit: cover;
}

.btn{
    background-color: var(--color-orange);
    color: var(--color-dark);
    font-weight: 600;

    &:hover{
        transform: scale(1.1);
    }
}
</style>