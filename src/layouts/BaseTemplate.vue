<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const pageTitle = computed(() => route.meta.title || '')
</script>

<template>
  <div class="container">
    <h2 v-if="pageTitle">{{ pageTitle }}</h2>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 930px;
  margin: 0 auto;
  padding: 18px 0;
  height: 100%;
}
.container h2 {
  font-size: 20px;
  font-weight: 500;
  color: #262626;
  padding: 18px 0;
}
.content {
  border: 1px solid #e1e1e1;
  border-radius: 16px;
  background-color: #ffffff;
  padding: 10px;
}
</style>
