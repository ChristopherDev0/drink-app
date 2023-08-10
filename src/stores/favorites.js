import { ref, watch, onMounted, computed } from 'vue'
import { defineStore } from "pinia";
import { useDrinksStore } from './drinks'
import { useModalStore } from './modal';
import { useNotificationStore } from './notification';

/* definimos nuestro store */
export const useFavoritesStore = defineStore('favorites', () => {

    const drinks = useDrinksStore()
    const modal = useModalStore()
    const notification = useNotificationStore()
    const favorites = ref([]); //añadiendo favoridos del usuario
    /* favoritos va a ser igual a lo que tengamos en localstorage */
    onMounted(() => {
        favorites.value = JSON.parse(localStorage.getItem('favorites')) ?? []
    })

    /* cada que cambie favorires ejecutamos una funcion */
    watch(favorites, () => {
        syncUpLocalStorage()
    }, {
        deep: true
    })

    function syncUpLocalStorage()  {
        localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }

    function thereFavorite(id) {
        const favoritesLocalStorage = JSON.parse(localStorage.getItem('favorites')) ?? []
        return favoritesLocalStorage.some(favorite => favorite.idDrink === id) /* comprovamos si hay algun id igual */
    }

    //accion eliminar de avorito
    function deleteFavorite() {
        favorites.value = favorites.value.filter(favorite => favorite.idDrink !== drinks.recipe.idDrink) /*drinks.recipe.idDrink - bebida del modal que esta abirto  */
        
        notification.show = true
        notification.text = 'Eliminado de favoritos'
    }

    function addFavorite() {
        favorites.value.push(drinks.recipe)
        notification.show = true
        notification.text = 'Se agrego a favoritos'

    }

    function handleClickFavorites() {
        if(thereFavorite(drinks.recipe.idDrink)) {
            deleteFavorite()
            //e.target.textContent = 'Agregar a favoritos'
        } else {
            addFavorite()
            //e.target.textContent = 'Eliminar de favoritos'
        }
        modal.modal = false
    }

    const noFavorites = computed(() => favorites.value.length === 0)

    return {
        handleClickFavorites,
        favorites,
        thereFavorite,
        noFavorites
    }
})