import api from '../lib/axios'

//un objeto con nuestros servicios
export default {
    getCategories() {
        return api.get('/list.php?c=list')
    },
    searchRecipes(search) {
        return api.get(`/filter.php?c=${search.category}&i=${search.name}`)
    },
    searchRecipe(id) {
        return api.get(`/lookup.php?i=${id}`)
    }
}