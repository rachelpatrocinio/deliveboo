<template>
    <div class="up-button d-none grow" id="up-button" @click="goUp">
        <font-awesome-icon :icon="['fas', 'chevron-up']" />
        <p>TOP</p>
    </div>
</template>

<script>
export default {
    methods:{
        goUp(){
            window.scrollTo(0,0);
        },
        showUpButton(){
            const button = document.getElementById("up-button");
            button.classList.remove('d-none');
            button.classList.add('d-block');
        }
    },
    mounted(){
        setTimeout(() => {
            this.showUpButton()
        },2500);
    }
}
</script>


<style lang="scss" scoped>
@use "../style/general";

.d-block{
    display: block;
}

.d-none{
    display: none;
}

.up-button{
    background-color: var(--color-green);
    width: 70px;
    height: 70px;
    line-height: 30px;
    color: white;
    text-align: center;
    position: fixed;
    bottom: 20px;
    right: 20px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    cursor: pointer;
    animation: slide-in-right 0.9s ease-in;
    z-index: 99;
    border-radius: 15px;
}

@keyframes slide-in-right{
    0%{
        opacity:0;
        transform: translateX(50px);
    }
    100%{
        opacity: 1;
        transform: translateX(0px);
    }
}

.grow{
    animation-name: grow;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
}

@media screen and (max-width: 389px){
    .up-button{
        width: 20px;
    }
}

@keyframes grow{
    0%{
        transform: scale(0.8);
        transition: all .1s ease-in-out;

    }

    50%{
        transform: scale(0.9);
        transition: all .1s ease-in-out;

    }

    100%{
        transform: scale(0.8);
        transition: all .1s ease-in-out;

    }
}

</style>