<template>
    <section class="hero-banner mt-2 full-height">
        <div class="container">
            <div class="row px-3 px-md-0 py-5">
                <div class="col-12 col-md-6 bg-hero">
                    <h1 class="pt-1 title text-center"> DELIVEBOO </h1>
                    <h4>Il tuo ristorante preferito, direttamente a casa tua!</h4>
                    <p class="pb-3"> Ordina dai migliori ristoranti della città e ricevi il tuo cibo preferito in pochi
                        minuti. Consegniamo a domicilio piatti caldi e freschi, preparati con amore e cura dai migliori
                        chef. Scopri nuove cucine, esplora menù variegati e goditi la comodità di un servizio rapido e
                        affidabile!</p>
                    <div class="text-center">
                        <button class="btn btn-orange pb-1 grow">
                            <a @click="store.pageScroll">ORDINA ORA!</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { store } from "../store.js";
export default {
        data() {
            return {
            store,
        }
    }
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

.grow{
    animation-name: grow;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
}


@keyframes grow{
    0%{
        transform: scale(1.1);
        transition: all .1s ease-in-out;

    }

    50%{
        transform: scale(1.0);
        transition: all .1s ease-in-out;

    }

    100%{
        transform: scale(1.1);
        transition: all .1s ease-in-out;

    }
}
</style>