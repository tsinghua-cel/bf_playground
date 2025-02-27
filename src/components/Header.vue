<template>
  <header class="header">
    <p><router-link to="/">Evaluation Results Online Demonstration</router-link></p>

<!--    <img src="/rect-logo.svg" alt="Logo" class="logo" />-->
<!--    <nav>-->
<!--      <ul class="nav-list">-->
<!--        <li class="nav-item"><router-link to="/">Playground</router-link></li>-->
<!--        <li class="nav-item"><router-link to="/documents">Documents</router-link></li>-->
<!--      </ul>-->
<!--    </nav>-->
<!--    <a href="https://github.com/tsinghua-cel" target="_blank" rel="noopener noreferrer">-->
<!--      <img src="/assets/github.png" alt="GitHub" class="github-icon" />-->
<!--    </a>-->
  </header>
</template>

<script setup>
</script>

<style scoped>
header {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: #fff;
  padding: 3rem 0;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
header h1 {
  margin: 0;
  font-size: 2.8rem;
  font-weight: bold;
  letter-spacing: 1px;
}
header p {
  font-size: 1.4rem;
  margin: 0.5rem 0 1.5rem;
}
header::before {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: #fff;
  border-radius: 2px;
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