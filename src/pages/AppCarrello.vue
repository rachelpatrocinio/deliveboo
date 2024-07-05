<template>
<div class="container">
    <div class="row">
        <h1>CARRELLO</h1>
        <h3 v-for="dish in store.chart"> {{dish.name}} </h3>
    </div>
</div>
</template>

<script>
import {store} from '../store.js';

export default {
    data(){
        return{
            store
        }
    },
    methods:{
        saveChartToLocalStorage() {
            localStorage.chart = JSON.stringify(this.store.chart);
        }
    },

    mounted(){
        // console.log(this.store.chart)
        this.store.chart = localStorage.chart ? JSON.parse(localStorage.chart) : [];
    }
}
        
    
</script>

<style lang="scss" scoped>

</style>