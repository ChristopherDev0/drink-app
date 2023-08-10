/* store modal */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFavoritesStore } from './favorites'
import { useDrinksStore } from './drinks'

export const useModalStore = defineStore('modal', () => {

    const favorites = useFavoritesStore();
    const drinks = useDrinksStore();
    const modal = ref(false)

    /* en pinia a a las funciones de les conose como 'acciones' a estas funciones que modifican el state */

    function handleClickModal() { //acction
        modal.value = !modal.value
    }

    //getter
    const textButton = computed(() => {
        return favorites.thereFavorite(drinks.recipe.idDrink) ? 'Eliminar de favortio' : 'Agregar a favorito'
    })

    return {
        modal,
        handleClickModal,
        textButton
    }
})