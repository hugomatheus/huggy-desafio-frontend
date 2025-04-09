<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ title }}</h2>

      <div class="modal-actions">
        <button class="cancel" @click="$emit('cancel')">Cancelar</button>
        <button class="confirm" @click="$emit('confirm')">Excluir</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ visible: boolean, title: string }>()
defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #FFF;
  padding: 24px;
  border: 1px solid #E1E1E1;
  border-radius: 12px;
  width: 360px;
  min-height: 144px;
}
.modal-content h2 {
  font-size: 20px;
  text-align: left;
  font-weight: 500;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 46px;
}
button {
  padding: 10px 16px;
  border: none;
  background: none;
  cursor: pointer;
}
button.cancel {
  color: #505050;
}

button.confirm {
    color: #DE321B;
}
</style>
