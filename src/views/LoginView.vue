<template>
  <main>
    <div class="container">
      <h1>Login</h1>
      <button @click="loginWithHuggy">Fazer login com a Huggy</button>
    </div>
  </main>
</template>

<script setup lang="ts">
const loginWithHuggy = () => {
  window.location.href = `${import.meta.env.VITE_PREFIX_API_URL}/auth/huggy/redirect`
}
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h1 {
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
}
button {
  margin-top: 18px;
  border: none;
  height: 36px;
  background-color: #321bde;
  color: #ffffff;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  padding: 10px;
}
</style>
