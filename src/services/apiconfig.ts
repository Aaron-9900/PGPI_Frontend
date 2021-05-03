export interface ApiConfig {
  baseUrl: string
  timeout: number
}

export const API_CONFIG: ApiConfig = {
  baseUrl: "https://pgpi-backend.herokuapp.com/PGPI/api/backend/",
  timeout: 20000,
}
