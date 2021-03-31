import { GeneralApiProblem } from "./api-problem"

export const parseError = (error: GeneralApiProblem): string => {
  console.log(error)
  switch (error.kind) {
    case "unauthorized":
      return "Please, provide a valid email or password"
    case "rejected":
      return "Email is already in use"
    case "conflict":
      return "El stock se encuentra lleno."
    default:
      return "Process error"
  }
}
