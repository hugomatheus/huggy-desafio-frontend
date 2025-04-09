<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

onMounted(() => {
  const token = route.query.token as string
  if (token) {
    auth.saveToken(token)
    router.push({ name: 'contact.list' })
  }
})
</script>
