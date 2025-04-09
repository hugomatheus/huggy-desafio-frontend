<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ isEditing ? 'Editar contato' : 'Cadastrar contato' }}</h2>
      </div>

      <form @submit.prevent="submitForm">
        <div class="form-field form-field-width-60">
          <label>Nome*</label>
          <input v-model="name" type="text" />
          <small class="error">{{ errors.name }}</small>
        </div>

        <div class="form-field form-field-width-60">
          <label>Email*</label>
          <input v-model="email" type="email" />
          <small class="error">{{ errors.email }}</small>
        </div>

        <div class="form-field form-field-width-50">
          <label>Telefone</label>
          <input v-model="phone" type="text" />
          <small class="error">{{ errors.phone }}</small>
        </div>

        <div class="form-field form-field-width-50">
          <label>Celular</label>
          <input v-model="cellphone" type="text" />
          <small class="error">{{ errors.cellphone }}</small>
        </div>

        <div class="form-field form-field-width-75">
          <label>Endereço</label>
          <input v-model="street" type="text" />
          <small class="error">{{ errors['address.street'] }}</small>
        </div>
        <div class="form-group">
          <div class="form-field form-field-width-50">
            <label>Cidade</label>
            <input v-model="city" type="text" />
            <small class="error">{{ errors['address.city'] }}</small>
          </div>

          <div class="form-field">
            <label>Estado</label>
            <select v-model="state">
              <option value="">Selecione</option>
              <option v-for="uf in states" :key="uf" :value="uf">
                {{ uf }}
              </option>
            </select>
            <small class="error">{{ errors['address.state'] }}</small>
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn-cancel" type="button" @click="closeModal()">Cancelar</button>
          <button class="btn-submit" type="submit">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { contactSchema } from '@/validation/contactSchema'
import { toTypedSchema } from '@vee-validate/yup'
import { computed, nextTick, onMounted, watch } from 'vue'
import type { IContact } from '@/types/contact'
import { states } from '@/types/states'

const props = defineProps<{
  visible: boolean
  contact?: IContact | null
}>()

const emit = defineEmits(['submit', 'cancel'])

const { handleSubmit, resetForm, errors } = useForm({
  validationSchema: toTypedSchema(contactSchema),
})

const { value: name } = useField<string>('name')
const { value: email } = useField<string>('email')
const { value: phone } = useField<string>('phone')
const { value: cellphone } = useField<string>('cellphone')
const { value: street } = useField<string>('address.street')
const { value: city } = useField<string>('address.city')
const { value: state } = useField<string>('address.state')

const isEditing = computed(() => !!props.contact)

onMounted(() => {
  if (props.contact) {
    const normalized = {
      id: props.contact.id,
      name: props.contact.name ?? '',
      email: props.contact.email ?? '',
      phone: props.contact.phone ?? '',
      cellphone: props.contact.cellphone ?? '',
      address: {
        street: props.contact.address?.street ?? '',
        city: props.contact.address?.city ?? '',
        state: props.contact.address?.state ?? '',
      },
    }
    resetForm({ values: normalized })
  } else {
    resetForm()
  }
})
const submitForm = handleSubmit((values) => {
  emit('submit', values)
})
const closeModal = () => {
  emit('cancel')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  width: 610px;
  min-height: 650px;
}
.modal-content .modal-header {
  padding: 4px 10px;
  border-bottom: 1px solid #e1e1e1;
}
.modal-content h2 {
  font-size: 20px;
  text-align: left;
  font-weight: 500;
  padding: 20px 0;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.form-group {
  display: flex;
  align-items: center;
}

.form-field {
  display: flex;
  flex-direction: column;
  padding: 12px 10px;
  width: 60%;
}
.form-field-width-50 {
  width: 50%;
}
.form-field-width-60 {
  width: 60%;
}
.form-field-width-75 {
  width: 75%;
}
label {
  font-size: 12px;
  line-height: 16px;
  padding-bottom: 10px;
}

input,
select {
  outline: none;
  background-color: #f8f8f8;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  height: 36px;
  padding-left: 6px;
}
select {
  width: 50%;
}
.modal-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 26px 16px;
  border-top: 1px solid #e1e1e1;
}

.btn-cancel {
  border: none;
  background: none;
}

.btn-submit {
  border: none;
  color: #ffffff;
  background-color: #321bde;
  border-radius: 8px;
  padding: 9px 12px;
}
.error {
  color: red;
}
</style>
