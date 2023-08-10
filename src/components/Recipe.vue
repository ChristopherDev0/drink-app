<script setup>
import { useDrinksStore } from '../stores/drinks'

const drinks = useDrinksStore(); //instacionmos el store de pinia

defineProps({
    recipe: {
        type: Object
    }
})
</script>

<template>
    <div class="bg-gray-950 rounded-lg shadow-lg w-72 h-[335px] overflow-hidden mx-auto  transition duration-500 transform hover:translate-y-[-10px] ">
        <div class="h-52  overflow-hidden">
            <img 
                class="bg-cover"
                :src="recipe.strDrinkThumb" 
                :alt="'image of ' + recipe.strDrink">
        </div>
        <div class="px-5">
            <div class="flex items-center gap-3 my-3">
                <div>
                <div><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" class="fill-current text-yellow-300 w-6"><path d="M20.832 4.555A1 1 0 0 0 20 3H4a1 1 0 0 0-.832 1.554L11 16.303V20H8v2h8v-2h-3v-3.697l7.832-11.748zm-2.7.445-2 3H7.868l-2-3h12.264z"></path></svg></div>
            </div>
            <h2 class="py-2 text-base font-semibold truncate">{{ recipe.strDrink }}</h2>
            </div>
            <button 
            class="inline-flex items-center hover:opacity-[0.7] justify-center font-semibold transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-md w-full py-2 rounded-md cursor-pointer bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-lg shadow-blue-500/40 active:opacity-[0.85] px-4"
                @click="drinks.selectDrink(recipe.idDrink)"
                >
                Ver receta
                </button>
        </div>
    </div>
</template>


