<template>
  <header class="header">
<!--    <img src="/rect-logo.svg" alt="Logo" class="logo" />-->
    <nav>
      <ul class="nav-list">
        <li class="nav-item"><router-link to="/">Home</router-link></li>
        <li class="nav-item"><router-link to="/playground">Playground</router-link></li>
        <li class="nav-item"><router-link to="/blogs">Blogs</router-link></li>
        <li class="nav-item"><router-link to="/#about">About</router-link></li>
      </ul>
    </nav>
    <a href="https://github.com/tsinghua-cel" target="_blank" rel="noopener noreferrer">
      <img src="/assets/github.png" alt="GitHub" class="github-icon" />
    </a>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  color: #343a40;
  border-bottom: 1px solid #e0e0e0;
}

.logo {
  width: 200px;
  height: 60px;
  margin-right: 20px;
}

.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
}

.nav-item {
  margin: 0 15px; /* Adjust margin for better spacing */
}

.nav-item a {
  color: #343a40;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-item a:hover {
  color: #adb5bd;
}
.github-icon {
  width: 30px;
  height: 30px;
  transition: transform 0.3s;
}

.github-icon:hover {
  transform: scale(1.1);
}
</style>