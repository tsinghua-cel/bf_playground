<template>
  <div class="blogs-page">
    <div class="sidebar">
      <ul class="chapter-list">
        <li v-for="blog in blogs" :key="blog.id" @click="selectBlog(blog)" :class="{ active: selectedBlog && selectedBlog.id === blog.id }">
          {{ blog.title }}
        </li>
      </ul>
    </div>
    <div class="content">
      <div v-if="selectedBlog" class="blog-content">
        <h2 class="blog-title">{{ selectedBlog.title }}</h2>
        <p class="blog-description">{{ selectedBlog.description }}</p>
        <div class="blog-body" v-html="selectedBlog.content"></div>
      </div>
      <div v-else class="no-selection">
        <p>Please select a chapter to read.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBlogs } from '../services/api'

const blogs = ref([])
const selectedBlog = ref(null)

const loadBlogs = async () => {
  const response = await getBlogs()
  blogs.value = response.data
}

const selectBlog = (blog) => {
  selectedBlog.value = blog
}

onMounted(() => {
  loadBlogs()
})
</script>

<style scoped>
.blogs-page {
  display: flex;
  padding: 20px;
}

.sidebar {
  width: 25%;
  border-right: 1px solid #e0e0e0;
  padding-right: 20px;
}

.chapter-list {
  list-style: none;
  padding: 0;
}

.chapter-list li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.chapter-list li:hover {
  background-color: #f0f0f0;
}

.chapter-list li.active {
  background-color: #007bff;
  color: white;
}

.content {
  width: 75%;
  padding-left: 20px;
}

.blog-content {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.blog-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.blog-description {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #666;
}

.blog-body {
  font-size: 1rem;
  color: #333;
}

.no-selection {
  text-align: center;
  font-size: 1.25rem;
  color: #666;
}
</style>