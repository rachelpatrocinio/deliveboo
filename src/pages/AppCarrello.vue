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

        //funzione per il salvataggio del carrello nel localStorage
        saveChart() {
            localStorage.chart = JSON.stringify(this.store.chart);
        }
    },

    mounted(){
        // console.log(this.store.chart)
        
        //richiamo il carrello e se è stato riempito, allora mi restituisce un oggetto [JSON.parse()], altrimenti array vuoto
        this.store.chart = localStorage.chart ? JSON.parse(localStorage.chart) : [];
    }
}
        
    
</script>

<style lang="scss" scoped>

</style>