import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    saveToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    getToken() {
      this.token = localStorage.getItem('token')
      return this.token;
    },

    logout() {
      this.token = null
      localStorage.removeItem('token')
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
  },
})
