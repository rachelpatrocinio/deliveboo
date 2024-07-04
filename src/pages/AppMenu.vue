<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card"
                v-for="dish in dishes"
                >
                    <div class="card-title">
                        {{ dish.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import axios from "axios";
    export default {
        data() {
            return {
                dishes: [], //array dei piatti
                restaurant: [] //singolo ristorante
            }
        },
        methods: {
            fetchDishes() { // Popola l'array dei piatti
                axios.get("http://127.0.0.1:8000/api/dishes")
                    .then((res) => {
                this.dishes = res.data.dishes; 
                console.log(res.data.dishes);
            })

        },
            fetchRestaurant() { // chiamata parametrica del singolo ristorante
                axios.get("http://127.0.0.1:8000/api/restaurants/" + this.$route.params.slug).then((res)=>{this.restaurant = res.data.restaurant})
                }
    },
    created() {
        this.fetchDishes();
    }
}
    </script>
    
    <style lang="scss" scoped>
    
    </style>