<template>
<div class="card p-2">
    <h3 class="text-center">{{ restaurant.name }}</h3>
</div>
</template>

<script>
    export default {
        props:{
            restaurant: Object
        }
    }
</script>

<style lang="scss" scoped>

</style>