import { PetBody } from "../interfaces/petBodyInterface";
import { api } from "./axios";

export function createPet(params: PetBody) {
    return api.post("/pet", params);
  }