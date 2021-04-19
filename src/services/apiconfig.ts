export interface ApiConfig {
  baseUrl: string
  timeout: number
}

export const API_CONFIG: ApiConfig = {
  baseUrl: "http://localhost:8888/PGPI/api/backend/",
  timeout: 20000,
}
