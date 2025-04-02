import { UserData } from "./userInterface";

export interface Pet {
    id: number;
    birthDate: string;
    race: string;
    gender: "MALE" | "FEMALE";
    name: string;
    specie: string;
    image: string | null;
    user: UserData;
  }
  