import { PetBody } from "../interfaces/petBodyInterface";
import { api } from "./axios";


export function editPet(params: PetBody, petId: string) {
  return api.patch("/pet/"+petId, params);
}