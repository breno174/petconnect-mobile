import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Pet } from '@/src/interfaces/petInterface'; // adjust path as needed

type PetContextType = {
  selectedPet: Pet | null;
  setSelectedPet: (pet: Pet | null) => void;
};

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  return (
    <PetContext.Provider value={{ selectedPet, setSelectedPet }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePetContext = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePetContext must be used within a PetProvider');
  }
  return context;
};