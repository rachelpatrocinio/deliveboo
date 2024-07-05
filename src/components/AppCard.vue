<template>
<div class="card p-2"> 
<div class="card p-5">
    <h4 class="text-center">{{ restaurant.name }}</h4>
 

    <img class="restaurant-img mt-3" :src="imgPath + restaurant.thumb" alt="Foto Ristorante">

    <div>
        <ul class="d-flex justify-content-center mt-3 p-0">
            <li class="px-2" v-for="type in restaurant.types">
                {{ type.name }}
            </li>
        </ul>
    </div>

    <div class="text-center mt-2">
        <button class="btn">
            <RouterLink class="link" :to="{name: 'menu', params: {slug: 'show.slug'}}">Menu</RouterLink>
        </button>
    </div>
</div>
</div>
</template>

<script>
    export default {
        data() {
            return {
            imgPath: '../../public/restaurants/'
            };
        },
        props:{
            restaurant: Object,
            slug: {type:Object},
        }

    }
</script>

<style lang="scss" scoped>
.restaurant-img{
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

.link{
    color: currentColor;
    text-decoration: none;
}

</style>