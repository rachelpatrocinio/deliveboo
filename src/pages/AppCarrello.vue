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
    mounted(){
        console.log(this.store.chart)
    }
}
        
    
</script>

<style lang="scss" scoped>

</style>