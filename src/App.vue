<script setup>
import { RouterView } from 'vue-router';
import HeaderVue from './components/Header.vue';
import Modal from './components/Modal.vue';
import FooterVue from './components/Footer.vue';
import Notification from './components/Notificaion.vue'
</script>

<template>
    <HeaderVue></HeaderVue>
    <main class="mx-auto mt-10 px-4 md:px-0">
        <RouterView></RouterView>
    </main>
    <Modal></Modal>
    <Notification></Notification>
    <FooterVue></FooterVue>
</template>
