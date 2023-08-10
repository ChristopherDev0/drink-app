<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useModalStore } from '../stores/modal'
import { useDrinksStore } from '../stores/drinks';
import { useFavoritesStore } from '../stores/favorites';

const modal = useModalStore();
const drinks = useDrinksStore();
const favorites = useFavoritesStore();

const formatIngredient = () => { //llenamos un div con las cantidades de los ingrediuentes
    const ingredientsDiv = document.createElement('DIV')
    for(let i=1; i<=15; i++){
        if(drinks.recipe[`strIngredient${i}`]){
            const ingredient = drinks.recipe[`strIngredient${i}`]
            const amount = drinks.recipe[`strMeasure${i}`]

            const ingredientAmount = document.createElement('P')
            ingredientAmount.classList.add('text-md')
            ingredientAmount.textContent = `${ingredient} - ${amount}`

            ingredientsDiv.appendChild(ingredientAmount)
        }
    }

    return ingredientsDiv
}

</script>

<template>
    <TransitionRoot as="template" :show="modal.modal" >
      <Dialog as="div" class="relative z-10 " @close="modal.handleClickModal"> <!-- cierra modal -->
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-950 bg-opacity-80 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="min-w-[330px] relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                <div>
                  <div class="mt-3 text-gray-600">
                    <DialogTitle as="h3" class="font-extrabold text-xl md:text-2xl my-5">
                        {{ drinks.recipe.strDrink }}
                    </DialogTitle>
                    <div class="flex flex-col md:flex-row gap-5 items-start justify-between">
                      <div class="md:w-1/3 h-auto rounded-lg overflow-hidden shadow-lg mx-auto">
                        <img class="w-32 md:w-80 mx-auto" :src="drinks.recipe.strDrinkThumb" :alt="'image of' + drinks.recipe.strDrink">
                      </div>
                      <div class="md:w-2/3">
                        <DialogTitle as="h3" class="font-extrabold text-lg md:text-2xl mb-5">
                            Ingredientes y cantidades
                        </DialogTitle>
                        <div v-html="formatIngredient().outerHTML"></div>
                        <DialogTitle as="h3" class="font-extrabold text-lg md:text-2xl my-5">
                            Instrucciones
                        </DialogTitle>
                        <p>
                            {{ drinks.recipe.strInstructionsES ? drinks.recipe.strInstructionsES : drinks.recipe.strInstructions  }}
                        </p>
                      </div>
                    </div>
                    
                    
                </div>
                </div>
                <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                    <button
                        type="button"
                        class="w-full p-2 rounded-md text-white bg-gray-800 hover:bg-gray-900 text-center text-sm md:text-base"
                        @click="modal.handleClickModal()"
                    >
                    Cerrar
                    </button>
                    <button
                        type="button"
                        class="text-sm md:text-base inline-flex items-center hover:opacity-[0.7] justify-center font-semibold transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-md w-full py-3 rounded-md cursor-pointer bg-gradient-to-tr from-purple-600 to-purple-400 text-white shadow-lg shadow-purple-500/40 active:opacity-[0.85] px-4"
                        @click="favorites.handleClickFavorites"
                    >
                        {{ modal.textButton }}
                    </button>
                </div> 
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>
  