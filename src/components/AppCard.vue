<template>
<div class="card p-5">
    <h3 class="text-center">{{ restaurant.name }}</h3>
    <img class="restaurant-img mt-3" :src="imgPath + restaurant.thumb" alt="Foto Ristorante">
</div>
</template>

<script>
    export default {
        props:{
            restaurant: Object
        },
        data() {
            return {
            imgPath: '../../public/restaurants/'
            };
        },
    }
</script>

<style lang="scss" scoped>
.restaurant-img{
    aspect-ratio: 1/1;
    object-fit: cover;
}

</style>