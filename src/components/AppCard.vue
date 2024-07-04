<template>
<div class="card p-2"> 
<div class="card p-5">
    <h3 class="text-center">{{ restaurant.name }}</h3>
    <div>
        <ul>
            <li v-for="type in restaurant.types">
                {{ type.name }}
            </li>
        </ul>
    </div>
    <div class="text-end">
        <button class="btn btn-info">
            <RouterLink class="link" :to="{name: 'menu', params: {slug: 'show.slug'}}">Menu</RouterLink>
        </button>
    </div>
    <img class="restaurant-img mt-3" :src="imgPath + restaurant.thumb" alt="Foto Ristorante">
</div>
</template>

<script>
    export default {
        props:{
            restaurant: Object,
            slug: {type:Object},
        }
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