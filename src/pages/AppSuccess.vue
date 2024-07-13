<template>
    <div class="container py-5">
        <div class="row py-5">
            <h1 class="text-success mt-5">Pagamento effettuato con successo!</h1>
            <p>Grazie per aver ordinato!</p>
            <RouterLink to="/">
                <button class="btn btn-orange">
                    RITORNA ALLA HOME PAGE
                </button>
            </RouterLink>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
@use '../style/general';

</style>