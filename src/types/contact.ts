export interface IContact {
    id: number
    name: string
    email: string | null
    phone: string | null
    cellphone: string | null
    created_at: string
    updated_at: string
    address?: {
      street?: string | null
      city?: string | null
      state?: string | null
    } | null
  }

  export interface IChartCity {
    city: string
    state: string
    total: number
  }
  
  export interface IChartState {
    state: string
    total: number
  }