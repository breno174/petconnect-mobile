import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeCardList from '../../components/HomeCardList';
import { getPets } from '@/src/api/get-pets';
import { Pet } from '@/src/interfaces/petInterface';
import { FilterProps } from '@/src/interfaces/filterInterface';
import { FilterBottomSheet } from '@/src/components/FilterBottomSheet';

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  // const navigation = useNavigation();

  // Fetch pets on component mount
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPets();
        setPets(data);
      } catch (err) {
        setError('Failed to fetch pets.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  // Calculate age
  const calculateAge = useCallback((birthDate: string) => {
    const dateBirthDate = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - dateBirthDate.getFullYear();
    const monthDiff = today.getMonth() - dateBirthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dateBirthDate.getDate())
    ) {
      age--;
    }

    return age;
  }, []);

  // Calculate age range based on all pets
  const ageRange = useMemo(() => {
    if (pets.length === 0) return [0, 15]; // Default range
    const ages = pets.map((pet) => calculateAge(pet.birthDate));
    return [Math.min(...ages), Math.max(...ages)];
  }, [pets, calculateAge]);

  // Initialize filter parameters with valid ageRange
  const [filterParameters, setFilterParameters] = useState<FilterProps>({
    species: '',
    race: '',
    gender: 'ALL',
    ageRange: [ageRange[0], ageRange[1]],
  });

  // Update filterParameters when ageRange changes
  useEffect(() => {
    setFilterParameters((prev) => ({
      ...prev,
      ageRange: [ageRange[0], ageRange[1]],
    }));
  }, [ageRange]);

  // Generate filter options based on all pets
  const speciesOptions = useMemo(() => {
    const species = filteredPets.map((pet) => pet.specie);
    return Array.from(new Set(species));
  }, [filteredPets]);

  const breedOptions = useMemo(() => {
    const breeds = filteredPets.map((pet) => pet.race);
    return Array.from(new Set(breeds));
  }, [filteredPets]);

  // Apply filters whenever filterParameters or pets change
  useEffect(() => {
    let updatedPets = pets;

    if (filterParameters.species) {
      updatedPets = updatedPets.filter(
        (pet) =>
          pet.specie.toLowerCase() === filterParameters.species.toLowerCase()
      );
    }

    if (filterParameters.race) {
      updatedPets = updatedPets.filter(
        (pet) => pet.race.toLowerCase() === filterParameters.race!.toLowerCase()
      );
    }

    if (filterParameters.gender && filterParameters.gender !== 'ALL') {
      updatedPets = updatedPets.filter(
        (pet) => pet.gender === filterParameters.gender
      );
    }

    if (filterParameters.ageRange) {
      const [minAge, maxAge] = filterParameters.ageRange;
      updatedPets = updatedPets.filter((pet) => {
        const age = calculateAge(pet.birthDate);
        return age >= minAge && age <= maxAge;
      });
    }

    setFilteredPets(updatedPets);
  }, [filterParameters, pets, calculateAge]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading pets...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HomeCardList petList= {filteredPets}/>
      <FilterBottomSheet
        filterParameters={filterParameters}
        setFilterParameters={setFilterParameters}
        species={speciesOptions}
        breeds={breedOptions}
        minAge={ageRange[0]}
        maxAge={ageRange[1]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  }
});