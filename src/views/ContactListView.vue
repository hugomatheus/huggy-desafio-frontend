<template>
  <header>
    <div class="search">
      <img :src="searchIcon" alt="" />
      <input
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        type="text"
        placeholder="Buscar contato"
      />
    </div>
    <div class="header-actions">
      <button @click="openCreateConcactFormModal()">
        <img :src="addIcon" alt="" />
        Adicionar contato
      </button>
      <router-link :to="{ name: 'contact.charts' }"><img :src="reportIcon" alt="" /></router-link>
    </div>
  </header>
  <main>
    <table>
      <thead>
        <tr class="tr-header">
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(contact, index) in contactStore.contacts" :key="index" class="tr-content">
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.phone }}</td>
          <td class="td-actions">
            <img @click="openEditContactFormModal(contact)" :src="editIcon" alt="Editar" />
            <img @click="openDeleteModal(contact.id)" :src="deleteIcon" alt="Deletar" />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="contactStore.contacts.length === 0" class="empty-contacts">
      <img :src="emptyContactImg" alt="" />
      <button @click="openCreateConcactFormModal()">
        <img :src="addIcon" alt="" />
        Adicionar contato
      </button>
    </div>
  </main>
  <ConfirmDeleteModal
    title="Excluir este contato ?"
    :visible="showDeleteModal"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
  <ContactFormModal
    v-if="showContactFormModal"
    :contact="selectedContactFormModal"
    :visible="showContactFormModal"
    @submit="handleContactFormSubmit"
    @cancel="cancelContactFormModal"
  />
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  height: 68px;
  gap: 12px;
}

.search {
  position: relative;
  display: flex;
  align-items: center;
  width: 250px;
}

.search img {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.search input {
  width: 100%;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #e1e1e1;
  background-color: #f8f8f8;
  padding: 8px 12px 8px 30px;
  outline: none;
}

header .header-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

button {
  display: flex;
  align-items: center;
  border: none;
  height: 36px;
  background-color: #321bde;
  color: #ffffff;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  padding: 10px 20px;
  gap: 8px;
}

main {
  display: flex;
  align-items: center;
  flex-direction: column;
}

main .empty-contacts {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}

table {
  margin-top: 20px;
  border-collapse: collapse;
  width: 100%;
  color: #505050;
}
table th {
  padding: 13px 16px 13px 24px;
  text-align: left;
  font-size: 12px;
  font-weight: 500;
}

table td {
  padding: 23px 16px 23px 16px;
  text-align: left;
  font-size: 14px;
}

table .tr-header {
  border-bottom: 1px solid #e1e1e1;
}

table .tr-content:hover {
  background-color: #e1e1e1;
}

table .tr-content:hover td:first-child {
  border-radius: 8px 0 0 8px;
}

table .tr-content:hover td:last-child {
  border-radius: 0 8px 8px 0;
}

table .td-actions {
  text-align: center;
}

table .td-actions img {
  cursor: pointer;
}

table .td-actions > img {
  margin-right: 16px;
}
</style>

<script setup lang="ts">
import searchIcon from '@/assets/search.png'
import reportIcon from '@/assets/report.png'
import addIcon from '@/assets/add.png'
import editIcon from '@/assets/edit.png'
import deleteIcon from '@/assets/delete.png'
import emptyContactImg from '@/assets/empty-contact.png'
import { nextTick, onMounted, ref } from 'vue'
import { useContactStore } from '@/stores/contacts'
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
import ContactFormModal from '@/components/ContactFormModal.vue'
import type { IContact } from '@/types/contact'

const contactStore = useContactStore()

const searchQuery = ref('')

const showDeleteModal = ref(false)
const contactDeleteId = ref<number | null>(null)

const showContactFormModal = ref(false)
const selectedContactFormModal = ref<IContact | null>(null)

onMounted(async () => {
  await contactStore.findAll()
})

const handleSearch = async () => {
  await contactStore.findAll(searchQuery.value)
}

const openDeleteModal = (id: number) => {
  contactDeleteId.value = id
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (contactDeleteId.value) {
    await contactStore.delete(contactDeleteId.value)
    await contactStore.findAll()
  }
  showDeleteModal.value = false
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

const openCreateConcactFormModal = () => {
  selectedContactFormModal.value = null
  showContactFormModal.value = false
  nextTick(() => {
    showContactFormModal.value = true
  })
}

const openEditContactFormModal = (contact: IContact) => {
  selectedContactFormModal.value = contact
  showContactFormModal.value = false
  nextTick(() => {
    showContactFormModal.value = true
  })
}

const handleContactFormSubmit = async (contact: IContact) => {
  if (contact.id) {
    await contactStore.edit(contact)
  } else {
    await contactStore.create(contact)
  }
  await contactStore.findAll()
  showContactFormModal.value = false
  selectedContactFormModal.value = null
}
const cancelContactFormModal = () => {
  showContactFormModal.value = false
  selectedContactFormModal.value = null
}
</script>
