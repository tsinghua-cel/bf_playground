<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <Header />
    <main class="container mx-auto px-4 py-8 flex-grow">
      <router-view></router-view>
    </main>
    <footer class="footer">
      <Footer />
    </footer>

  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { RouterView } from 'vue-router'
</script>

<style>
@import 'tailwindcss';
</style>