<script setup>
import { RouterView } from 'vue-router';
import HeaderVue from './components/Header.vue';
</script>

<template>
    <HeaderVue></HeaderVue>
    <main class="mx-auto mt-10">
        <RouterView></RouterView>
    </main>
</template>
