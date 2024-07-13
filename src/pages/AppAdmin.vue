<template>
<div class="container py-5">
    <div class="row py-5">
        <div class="col py-md-5">
            <div class="d-flex flex-wrap ">
                <div class="col-12 col-md-6 p-5 bg-green text-center text-md-start radius-top">
                    <h2>Sei un Ristoratore?</h2>
                    <h4>Diventa nostro Partner!</h4>
                    <p>
                        Siamo alla ricerca di partner entusiasti e appassionati per unirsi alla nostra piattaforma di consegna di cibo, che si distingue per qualità, efficienza e servizio eccellente. Se sei un ristorante, una pizzeria, una gelateria o un qualsiasi locale gastronomico che desidera ampliare il proprio bacino di clienti e incrementare le vendite, siamo la soluzione ideale per te!
                    </p>
                    <button class="btn btn-orange">
                        <a target="_blank" href="http://127.0.0.1:8000/">COLLABORA CON NOI</a>
                    </button>
                </div>
                <div class="col-12 col-md-6 p-5 d-flex flex-column justify-content-center align-items-center bg-orange radius-bottom">
                    <h4>Sei già nostro partner?</h4>
                    <button class="btn btn-green">
                        <a target="_blank" href="http://127.0.0.1:8000/login">LOG IN</a>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
@use '../style/general';

.bg-green:hover + .bg-orange{
    background-color: var(--color-green);

    .btn{
        background-color: var(--color-orange);
    }
}

.bg-green:hover{
    background-color: var(--color-orange);

    .btn{
        background-color: var(--color-green);
    }
}
</style>