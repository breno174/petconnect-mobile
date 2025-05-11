export interface PetBody {
  name: string
  gender: "MALE" | "FEMALE",
  birthDate: Date,
  specie: string,
  race: string
}