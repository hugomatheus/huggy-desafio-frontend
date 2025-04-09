import { defineStore } from 'pinia'
import api from '@/services/api'
import { useAuthStore } from './auth'
import type { IPaginate } from '@/types/paginate'
import type { IChartCity, IChartState, IContact } from '@/types/contact'

export const useContactStore = defineStore('contact', {
  state: () => ({
    contacts: [] as IContact[],
    chartCity: [] as IChartCity[],
    chartState: [] as IChartState[],
  }),
  actions: {
    async findAll(search?: string) {
      try {
        const auth = useAuthStore()
        const token = auth.getToken()

        const response = await api.get<IPaginate<IContact>>('/contacts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search,
          },
        })
        this.contacts = response.data.data
      } catch (err) {
        console.error(err)
      } finally {
      }
    },
    async create(contact: IContact) {
      try {
        const auth = useAuthStore()
        const token = auth.getToken()
        await api.post<IContact>('/contacts', contact, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
    async edit(contact: IContact) {
      try {
        const auth = useAuthStore()
        const token = auth.getToken()
        await api.put<IContact>(`/contacts/${contact.id}`, contact, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (error) {
        console.log(error)
      }
    },

    async delete(id: number) {
      try {
        const auth = useAuthStore()
        const token = auth.getToken()
        await api.delete<{ message: string }>(`/contacts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
    async getCharts() {
      try {
        const auth = useAuthStore()
        const token = auth.getToken()

        const response = await api.get<{ chart_city: IChartCity[]; chart_state: IChartState[] }>(
          '/contacts/charts',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        this.chartCity = response.data.chart_city
        this.chartState = response.data.chart_state
      } catch (err) {
        console.error(err)
      }
    },
  },
  getters: {},
})
