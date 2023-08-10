<script setup>
import Recipe from '../components/Recipe.vue';
import { useFavoritesStore } from '../stores/favorites';

const favorites = useFavoritesStore()

</script>

<template>
    <div class="mb-16 py-5">
        <h1 class="text-3xl md:text-5xl font-extrabold text-center text-gray-500">Tus recetas Favoritas</h1>
        <div v-if="favorites.noFavorites" class="mx-auto text-center">
            <p class="font-bold text-center text-yellow-300 mt-5">¡Aun no has seleccionado nigun favorito!</p>
            <div class="flex items-center justify-center mt-10">
                <img class="w-72 md:w-96" src="/img/search2.svg" alt="photo search">
            </div>
        </div>
       
       <div v-else>
        <p class="font-bold text-center text-yellow-300 mt-5">¡Recetas seleccionadas!</p>
        <div class="max-w-6xl bg-[#151e2c] rounded-lg mx-auto shadow-2xl py-10 px-5 mt-14">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Recipe v-for="recipe in favorites.favorites" :key="recipe.idDrink" :recipe="recipe"></Recipe>
        </div>
       </div>
    </div>

    </div>
</template>


