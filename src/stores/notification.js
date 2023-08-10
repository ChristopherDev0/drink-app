import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', () => {
    
    const text = ref('')
    const error = ref(false)
    const show = ref(false)

    //reiniciamos los states
    watch(show, () => {
        if(show.value){
            setTimeout(() => {
                text.value = ''
                error.value = false
                show.value = false
            }, 5000);
        }
    })
    
    /* function $reset() {
        text.value = ''
        error.value = false
        show.value = false
    } */

    return {
        text,
        error,
        show,
    }
})