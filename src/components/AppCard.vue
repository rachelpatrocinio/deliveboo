<template>
<RouterLink class="link" :to="pathAppMenu + restaurant.slug">
<div class="card p-5">
    <h4 class="text-center">{{ restaurant.name }}</h4>
    <img v-if="restaurant.thumb" class="restaurant-img mt-3" :src="imgPath + restaurant.thumb" alt="Foto Ristorante">
    <img v-else class="restaurant-img mt-3" src="../../../public/logo.png" alt="Foto Ristorante">
    <div>
        <ul class="d-flex justify-content-center mt-3 p-0">
            <li class="px-2" v-for="type in restaurant.types">
                <p class="type-badge text-white" :class="type.name">
                    {{ type.name }}
                </p>
            </li>
        </ul>
    </div>
</div>
</RouterLink>
</template>

<script>
    export default {
        data() {
            return {
            imgPath: '../../public/',
            pathAppMenu: '/menu/'
            };
        },
        props:{
            restaurant: Object,
            slug: {type:Object},
        }
    }
</script>

<style lang="scss" scoped>
@use '../style/partials/layout';

.card{
    &:hover{
        transform: scale(1.02);
    }
}
.restaurant-img{
    aspect-ratio: 1/1;
    object-fit: cover;
}

.link{
    color: currentColor;
    text-decoration: none;
}

.type{
    font-size: 12px;
}
</style>