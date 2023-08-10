import axios from 'axios'

//url base para conusltar
//todos los enponints a consultar inician con la misma base

const api = axios.create({
    baseURL: 'https://www.thecocktaildb.com/api/json/v1/1'
})

export default api