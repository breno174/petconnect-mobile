import { api } from "./axios";


export function deletePet(petId: string) {
  return api.delete("/pet/"+petId);
}