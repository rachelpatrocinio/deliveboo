<template>
    <section class="hero-banner mt-2 full-height">
        <div class="container">
            <div class="row py-5">
                <div class="col-12 col-md-6 bg-hero">
                    <h1 class="pt-1 title text-center"> DELIVEBOO </h1>
                    <h4>Il tuo ristorante preferito, direttamente a casa tua!</h4>
                    <p class="pb-3"> Ordina dai migliori ristoranti della città e ricevi il tuo cibo preferito in pochi
                        minuti. Consegniamo a domicilio piatti caldi e freschi, preparati con amore e cura dai migliori
                        chef. Scopri nuove cucine, esplora menù variegati e goditi la comodità di un servizio rapido e
                        affidabile!</p>
                    <div class="text-center">
                        <button class="btn btn-orange pb-1">
                            <a href="#types">ORDINA ORA!</a>
                        </button>
                    </div>

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

.hero-banner {
    background-image: url('../../public/hero-banner.jpg');

    .title {
        font-size: 50px;
    }
}
</style>