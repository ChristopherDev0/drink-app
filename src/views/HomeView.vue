<script setup>
import { ref, watch, computed } from 'vue';
import Recipe from '../components/Recipe.vue';
import { useDrinksStore } from '../stores/drinks'

const drinks = useDrinksStore(); //llamamos a la funcion que contiene los states

const currentPage = ref(1); //variable reactiva para numero de pagina actual
const itemsPerPage = ref(9);//varibale para numero de elementos por pagina
const listCripto = ref([]);

watch(() => drinks.noRecipes, () => {
    listCripto.value = drinks.recipes;
  /*   console.log('cambio') */

    currentPage.value = 1;
}, {
        deep: true
})

//propiedad computada para el total de paginas
const totalPages = computed(() => Math.ceil(listCripto.value.length / itemsPerPage.value));

//elementos a mostrar en la pagina actual
const displayedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;

    return listCripto.value.slice(start, end);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

</script>

<template>
    <div class="min-h-[300px] mb-32">
        <h1 class="text-3xl md:text-5xl font-extrabold text-center text-gray-500">Recetas de las bebidas</h1>
        <p v-if="!drinks.noRecipes" class="font-bold text-center text-yellow-300 mt-5">¡Resultados de tu busqueda!</p>
        <div v-if="drinks.noRecipes" >
            <p class="font-bold text-center text-yellow-300 mt-5">¡No hay busqueda aun!</p>
            <div class="flex items-center justify-center mt-10">
                <img class="w-72 md:w-96" src="/img/search2.svg" alt="photo search">
            </div>
        </div>
        <div v-else class="max-w-6xl bg-[#151e2c] rounded-lg mx-auto shadow-2xl py-10 px-5 mt-14">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <!-- se recorria en drinks.recipes pero se mostraban muchos elemtos por lo que se decidio hacer una paginacion -->
             <Recipe v-for="recipe in displayedItems" :key="recipe.idDrink" :recipe="recipe"></Recipe>
        </div>
            <div class="bg-gray-900 w-full  p-5 rounded-md mt-5 flex items-center justify-between">
            <p class="text-sm text-gray-400">Pagina {{ currentPage }} de {{ totalPages }}</p>
            <div class="flex items-center gap-7">
                <button  @click="prevPage" class="w-9 h-9 rounded-md border text-gray-400 hover:text-white border-gray-400 hover:bg-blue-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current  w-5" viewBox="0 0 24 24"><path d="m8.121 12 4.94-4.939-2.122-2.122L3.879 12l7.06 7.061 2.122-2.122z"></path><path d="M17.939 4.939 10.879 12l7.06 7.061 2.122-2.122L15.121 12l4.94-4.939z"></path></svg>                </button>
                <button @click="nextPage" class="w-9 h-9 rounded-md border text-gray-400 hover:text-white border-gray-400 hover:bg-blue-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-5" viewBox="0 0 24 24"><path d="m13.061 4.939-2.122 2.122L15.879 12l-4.94 4.939 2.122 2.122L20.121 12z"></path><path d="M6.061 19.061 13.121 12l-7.06-7.061-2.122 2.122L8.879 12l-4.94 4.939z"></path></svg>
                </button>
            </div>
            </div>
        </div>

    </div>

</template>


