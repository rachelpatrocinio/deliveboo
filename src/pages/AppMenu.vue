<template>

</template>
<script>
    export default {
        data() {
            return {
                dishes: [] //array dei piatti
            }
        },
        methods: {
            fetchDishes() {
                axios.get("http://127.0.0.1:8000/api/dishes")
                    .then((res) => {
                this.dishes = res.data.dishes; // Popola l'array dei piatti
            })
        }
    },
    created() {
        this.fetchDishes();
    }
}
    </script>
    
    <style lang="scss" scoped>
    
    </style>