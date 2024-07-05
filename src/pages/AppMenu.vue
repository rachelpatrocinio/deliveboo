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
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <button class="btn" @click="goBack">Torna Indietro</button>
            </div>
        </div>
    </div>

</template>
<script>
import axios from "axios";
export default {
    props:{
        restaurant: Object,
    },
    data() {
        return {
            restaurant: [],
            imgPath: '../../public/',
        }
    },
    methods: {
        fetchRestaurant() { // chiamata parametrica del singolo ristorante
            axios
                .get("http://127.0.0.1:8000/api/restaurants/" + this.$route.params.slug)
                .then((res)=>{
                    this.restaurant = res.data.restaurant;
                    console.log(this.restaurant);
                })
        },
        goBack(){
            this.$router.back()
        }
    },
    created() {
    this.fetchRestaurant();
    }
}
</script>
    
<style lang="scss" scoped>

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