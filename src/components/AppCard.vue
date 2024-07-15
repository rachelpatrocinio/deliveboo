<template>
<RouterLink class="link" :to="pathAppMenu + restaurant.slug">
<div class="card p-5 py-md-5">
    <h4 class="text-center">{{ restaurant.name }}</h4>
    <img v-if="restaurant.thumb !== null" class="restaurant-img mt-3" :src="restaurant.thumb_url" alt="Foto Ristorante">
    <img v-else class="restaurant-img mt-3" src="../../../public/logo.png" alt="Foto Ristorante">
    <ul class="d-flex justify-content-center align-center flex-md-column flex-xxl-row mt-3 p-0 gap-1 gap-lg-3 ">
        <li class="px-2 type-badge text-white btn py-2" :class="type.name" v-for="type in restaurant.types">
         {{ type.name }}
        </li>
    </ul>
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
    object-fit: contain;
}

.link{
    color: currentColor;
    text-decoration: none;
}

.type{
    font-size: 12px;
}


@media (min-width: 768px) {
  .card {
    height: 400px;
  }
}

@media (min-width: 992px) {
  .card {
    height: 450px;
  }
}

@media (min-width: 1200px) {
  .card {
    height: 480px;
  }
}
</style>