<script setup>
import { RouterLink, useRoute } from "vue-router";
import { computed } from "vue";
import { useDrinksStore } from '../stores/drinks'

const route = useRoute();
const store = useDrinksStore();


const pageHome = computed(() => route.name === 'home')


</script>

<template>
    <header class="bg-slate-950" :class="{header : pageHome}"> <!-- agreagrmos la clase si estamos en home -->
        <div class="px-5 py-10 max-w-6xl mx-auto">
            <div class="flex justify-between items-center ">
                <div>
                    <RouterLink :to="{name: 'home'}">
                        <img class="w-16" src="/img/logo.svg" alt="logo photo">
                    </RouterLink>
                </div>
                <nav class="flex gap-4">
                    <RouterLink 
                        :to="{name: 'home'}" 
                        class="text-white font-bold uppercase" 
                        active-class="text-orange-300"
                        >
                        Inicio
                    </RouterLink>
                    <RouterLink 
                        :to="{name: 'favorites'}" 
                        class="text-white font-bold uppercase" 
                        active-class="text-orange-300"
                        >
                        Favoritos
                    </RouterLink>
                </nav>
            </div>
            <form v-if="pageHome" class="max-w-md bg-orange-400 my-10 p-5 rounded-lg shadow-lg space-y-5">
                <div>
                    <label for="ingredients" class="font-semibold text-gray-100">Nombre o Ingredientes</label>
                    <input 
                        type="text"
                        id="ingredients"
                        class="p-3 w-full rounded-lg focus:outline-none"
                        placeholder="Nombre o ingrediente: vodka, Tequila..."
                    >
                </div>
                <div>
                    <label for="category" class="font-semibold text-gray-100">Categoria</label>
                    <select 
                        id="category" 
                        class="p-3 w-full rounded-lg focus:outline-none"
                    >
                        <option value="">-- selecione --</option>
                        <option v-for="category in store.categories" :key="category.strCategory" :value="category.strCategory" >
                            {{ category.strCategory }}
                        </option>
                    </select>
                </div>

                <input 
                    type="submit"
                    class="p-3 rounded-lg cursor-pointer text-white w-full text-center font-bold uppercase bg-cyan-500 hover:bg-cyan-700 transition-colors"
                    value="Buscar recetas"    
                >
            </form>
        </div>
    </header>
</template>

<style>
    .header {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/img/bg.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
}

</style>