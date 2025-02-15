<template>
  <div>
    <!-- Section 1: Large Background with Text Description -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Welcome to BunnyFinder</h1>
        <p class="hero-description"></p>
      </div>
    </section>

    <!-- Section 2: Four Small Images with Text Descriptions -->
    <section class="features-section">
      <div class="feature" v-for="feature in features" :key="feature.id">
        <img :src="feature.image" :alt="feature.title" class="feature-image" />
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-description">{{ feature.description }}</p>
      </div>
    </section>

    <!-- Section 3: Contact Information -->
    <section id="/#about" class="contact-section">
      <h2 class="contact-title">Contact Us</h2>
      <p class="contact-info">Email: contact@example.com</p>
      <p class="contact-info">Phone: +123 456 7890</p>
      <p class="contact-info">Address: 123 Main Street, Anytown, USA</p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const features = ref([
  { id: 1, image: '@/assets/feature1.jpg', title: 'Feature 1', description: 'Description for feature 1' },
  { id: 2, image: '@/assets/feature2.jpg', title: 'Feature 2', description: 'Description for feature 2' },
  { id: 3, image: '@/assets/feature3.jpg', title: 'Feature 3', description: 'Description for feature 3' },
  { id: 4, image: '@/assets/feature4.jpg', title: 'Feature 4', description: 'Description for feature 4' },
])
</script>

<style scoped>
/* Section 1: Large Background with Text Description */
.hero-section {
  background: url('@/assets/hero-background.jpg') no-repeat center center;
  background-size: cover;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  text-align: center;
}

.hero-content {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.hero-description {
  font-size: 1.25rem;
}

/* Section 2: Four Small Images with Text Descriptions */
.features-section {
  display: flex;
  justify-content: space-around;
  padding: 40px 20px;
  background-color: #f9f9f9;
}

.feature {
  text-align: center;
  max-width: 200px;
}

.feature-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.feature-title {
  font-size: 1.25rem;
  margin-bottom: 5px;
}

.feature-description {
  font-size: 1rem;
  color: #666;
}

/* Section 3: Contact Information */
.contact-section {
  padding: 40px 20px;
  background-color: #ffffff;
  text-align: center;
  border-top: 1px solid #e0e0e0;
}

.contact-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #343a40;
}

.contact-info {
  font-size: 1.25rem;
  margin-bottom: 10px;
  color: #666;
}

.contact-info::before {
  content: '• ';
  color: #343a40;
  font-weight: bold;
}
</style>