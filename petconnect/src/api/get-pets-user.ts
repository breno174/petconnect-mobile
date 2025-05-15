import { Pet } from "../interfaces/petInterface"
import { api } from "./axios"

export const getPetsUser = async (user : number): Promise<Pet[]> => {
  const response = await api.get<Pet[]>('/pet/user/' + user)
  return response.data
}