import { ref, onMounted, reactive, computed } from "vue";
import { defineStore } from "pinia";
import APIService from "../services/APIService";
import { useModalStore } from "./modal";

export const useDrinksStore  = defineStore('drinks', () => {
    /* importamos el store de modal para hacer un stores anidado */
    const modal = useModalStore();

    const categories = ref([]); /* state llamado categorias */
    const search = reactive({ /* state */
        name: '',
        category: ''
    })
    const recipes = ref([]) /* state */
    const recipe = ref([]) /* state */

    onMounted(async() => {
        const {data: {drinks}} = await APIService.getCategories()
        categories.value = drinks
    })

    async function getRecipes() { //funcion normal (accion) recomendacion de pinia
       const {data: {drinks}} = await APIService.searchRecipes(search) //aplicamos destructurin
       recipes.value = drinks
    }

    //funcion para buscar por el id
    async function selectDrink(id) {
        const {data: {drinks}} = await APIService.searchRecipe(id)
        recipe.value = drinks[0]
        modal.handleClickModal() /* cambia el state (true-false) */
    }

    const noRecipes = computed(() => recipes.value.length === 0)

    return {
        categories,
        search,
        getRecipes,
        recipes,
        selectDrink,
        recipe,
        noRecipes
    }
})