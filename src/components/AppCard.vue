<template>
<div class="card p-2"> 
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
</div>
</template>

<script>
    export default {
        props:{
            restaurant: Object,
            slug: {type:Object},
        }
    }
</script>

<style lang="scss" scoped>

</style>