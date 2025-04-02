import { Pet } from "../interfaces/petInterface"
import { api } from "./axios"

export const getPets = async (): Promise<Pet[]> => {
    const response = await api.get<Pet[]>('/pet')
    console.log(response.data)
    const pets: Pet[] = response.data.map((backendPet:any) => ({
      id: backendPet.id,
      birthDate: backendPet.birthDate,
      race: backendPet.race.charAt(0).toUpperCase() + backendPet.race.substring(1).toLowerCase(),
      gender: backendPet.gender,
      name: backendPet.name,
      specie: backendPet.specie.charAt(0).toUpperCase() + backendPet.specie.substring(1).toLowerCase(),
      image: backendPet.image,
      user: backendPet.user
    }))
    return pets
  }