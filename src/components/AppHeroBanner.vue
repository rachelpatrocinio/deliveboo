<template>
<section class="hero-banner mt-2">
    <!-- <img src="../../public/hero-banner.jpeg" alt="Hero-Banner"> -->
    <div class="container">
        <div class="row py-5">
            <div class="col-6 py-5">
                <h1 class="pt-5 title"> DELIVEBOO </h1>
                <p class="pb-5"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora quasi laborum veniam ratione sint? Non, perferendis nobis. Veniam nam ipsam in. Aliquid eos quod repudiandae distinctio voluptate debitis error labore.</p>
                <button class="btn">ORDINA ORA!</button>
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
.hero-banner{
    background-image: url('../../public/hero-banner.jpeg');

    .title{
        font-size: 80px;
    }

    .btn{
        background-color: var(--color-orange);
        color: var(--color-dark);
        font-weight: 600;

        &:hover{
            transform: scale(1.1);
        }
    }
}
</style>