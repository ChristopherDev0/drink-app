<script setup>
import { RouterLink, useRoute } from "vue-router";
import { computed } from "vue";
import { useDrinksStore } from '../stores/drinks'
import { useNotificationStore } from "../stores/notification";

const route = useRoute();
const store = useDrinksStore();
const notification = useNotificationStore()


const pageHome = computed(() => route.name === 'home')

const handleSubmit = () => {
    if(Object.values(store.search).includes('')) {
        //escribimos en el state de notifivations
        notification.text = 'Todos los campos son obligatorios'
        notification.show = true
        notification.error = true

        return
    }

    store.getRecipes()
    store.search.name = ''
    store.search.category = ''
    notification.text = 'Busqueda realizada con exito'
    notification.show = true

}

</script>

<template> 
    <div class="bg-gray-950 relative overflow-hidden h-20 md:h-28 py-5" :class="{'h-[950px]  md:h-[700px]' : pageHome}">
        <svg  :class="{'hidden' : !pageHome}" class="absolute -bottom-48 left-[-40%] h-[80rem] w-[180%] lg:-right-40 lg:bottom-auto lg:left-auto lg:top-[-40%] lg:h-[180%] lg:w-[80rem]" aria-hidden="true"><defs><radialGradient id=":R1d6:-desktop" cx="100%"><stop offset="0%" stop-color="rgba(56, 189, 248, 0.3)"></stop><stop offset="53.95%" stop-color="rgba(0, 71, 255, 0.09)"></stop><stop offset="100%" stop-color="rgba(10, 14, 23, 0)"></stop></radialGradient><radialGradient id=":R1d6:-mobile" cy="100%"><stop offset="0%" stop-color="rgba(56, 189, 248, 0.3)"></stop><stop offset="53.95%" stop-color="rgba(0, 71, 255, 0.09)"></stop><stop offset="100%" stop-color="rgba(10, 14, 23, 0)"></stop></radialGradient></defs><rect width="100%" height="100%" fill="url(#:R1d6:-desktop)" class="hidden lg:block"></rect><rect width="100%" height="100%" fill="url(#:R1d6:-mobile)" class="lg:hidden"></rect></svg>
    <header class="z-10 absolute w-full overflow-hidden" :class="{header : pageHome}"> <!-- agreagrmos la clase si estamos en home -->
        <div class="px-5 max-w-6xl mx-auto">
            <div class="flex justify-between items-center ">
                <div>
                    <RouterLink :to="{name: 'home'}">
                        <img class="w-12 md:w-16" src="/img/logo2.svg" alt="logo photo">
                    </RouterLink>
                </div>
                <nav class="flex gap-7 md:gap-10 text-gray-500">
                    <RouterLink 
                        :to="{name: 'home'}" 
                        class="font-bold uppercase text-sm  md:text-base" 
                        active-class="text-gray-50"
                        >
                        Inicio
                    </RouterLink>
                    <RouterLink 
                        :to="{name: 'favorites'}" 
                        class="font-bold uppercase text-sm md:text-base" 
                        active-class="text-gray-50"
                        >
                        Favoritos
                    </RouterLink>
                </nav>
            </div>

            <div class="animate-fade-up animate-once animate-duration-1000 animate-delay-700">
            <div  v-if="pageHome" class="mt-14 mb-10">
                <h1 class="text-4xl md:text-5xl font-bold text-white">Las mejores recetas de <span class="md:block text-yellow-300"> bebidas y malteadas</span></h1>
                <p class="max-w-md my-10 md:mt-6">Introduce el nombre de la bebida o un ingrediente de esta y selecciona una categoria</p>
            </div>
            <div v-if="pageHome" class="flex flex-col md:flex-row gap-14 md:gap-24 md:items-end">
                
            <form @submit.prevent="handleSubmit" class="max-w-md bg-transparent md:bg-gray-900 border border-gray-800 px-5 py-7 rounded-lg shadow-lg">
                <div class="rounded-lg border border-gray-500 px-2 pb-1 pt-[2px] w-full bg-gray-950 md:bg-gray-900">
                    <label class="text-sm text-gray-500">Nombre o Ingrediente</label>
                    <input 
                        type="text"
                        id="ingredients"
                        class="p-1 w-full border-none text-white bg-gray-950 md:bg-gray-900 focus:outline-none"
                        v-model="store.search.name"
                        >
                </div>
                <div class="rounded-lg border border-gray-500 px-2 pb-1 pt-[2px] w-full mt-5 bg-gray-950  md:bg-gray-900">
                <label class="text-sm text-gray-500">Categoria</label>
                <select  v-model="store.search.category" id="select" class="p-1 bg-gray-950 md:bg-gray-900 text-white w-full border-none focus:outline-none">
                    <option value=""></option>
                    <option v-for="category in store.categories" :key="category.strCategory" :value="category.strCategory" >
                        {{ category.strCategory }}
                    </option>
                </select>
            </div>
            <input type="submit" class="mt-7 inline-flex items-center hover:opacity-[0.7] justify-center font-semibold transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-md w-full py-3 rounded-md cursor-pointer bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-lg shadow-blue-500/40 active:opacity-[0.85] px-4" value="Buscar recetas">

            </form>
                <div>
                    <img class="w-72 mx-auto md:w-80" src="/img/search.svg" alt="search photo">
                </div>
            </div>
        </div>
        </div>
    </header>
</div>
<!--     <svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 100%; width: 100%;"><path d="M-23.42,147.55 C95.08,10.38 198.36,220.56 509.87,79.45 L509.31,166.30 L-10.44,154.45 Z" style="stroke: none; fill: #3e3752;"></path></svg>
 -->
 </template>

<style>
/*     .header {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/img/bg.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
}
 */
</style>