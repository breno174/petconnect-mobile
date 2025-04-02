export interface FilterProps {
    species: string;
    race: string;
    gender: "ALL" | "MALE" | "FEMALE";
    ageRange: [number, number];
  }