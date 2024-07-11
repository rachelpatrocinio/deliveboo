<template>
<section class="hero-banner mt-2">
    <div class="container">
        <div class="row py-5">
            <div class="col-12 col-md-6">
                <h1 class="pt-5 title"> DELIVEBOO </h1>
                <h4>Il tuo ristorante preferito, direttamente a casa tua!</h4>
                <p class="pb-5"> Ordina dai migliori ristoranti della città e ricevi il tuo cibo preferito in pochi minuti. Consegniamo a domicilio piatti caldi e freschi, preparati con amore e cura dai migliori chef. Scopri nuove cucine, esplora menù variegati e goditi la comodità di un servizio rapido e affidabile!</p>
                <button class="btn btn-orange">
                    <a href="#types">ORDINA ORA!</a>
                </button>
            </div>
        </div>
    </div>
</section>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
@use '../style/general';

.hero-banner{
    background-image: url('../../public/hero-banner.jpeg');

    .title{
        font-size: 50px;
    }
}
</style>