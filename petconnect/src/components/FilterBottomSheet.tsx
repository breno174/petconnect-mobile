import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { AgeFilter, GenderFilter, BreedFilter, SpeciesFilter } from './FilterOptions';
import { FilterProps } from '../interfaces/filterInterface';

interface FilterDrawerProps {
  filterParameters: FilterProps;
  setFilterParameters: React.Dispatch<React.SetStateAction<FilterProps>>;
  species: string[];
  breeds: string[];
  minAge: number;
  maxAge: number;
}

export const FilterBottomSheet: React.FC<FilterDrawerProps> = ({
  filterParameters,
  setFilterParameters,
  species,
  breeds,
  minAge,
  maxAge,
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const snapPoints = ['40%', '80%'];

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <>
      <Button title="Filtros" onPress={handleOpenSheet} />
      <BottomSheet
        index={isSheetOpen ? 1 : -1}
        snapPoints={snapPoints}
        onChange={(index: Number) => {
          if (index === -1) {
            setIsSheetOpen(false);
          } else {
            setIsSheetOpen(true);
          }
        }}
        enablePanDownToClose={true}
      >
        <View style={styles.sheetContent}>
          <Text style={styles.header}>Filtros</Text>
          <ScrollView style={styles.scrollView}>
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Espécie</Text>
              <SpeciesFilter
                filterParameters={filterParameters}
                setFilterParameters={setFilterParameters}
                species={species}
              />
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Raça</Text>
              <BreedFilter
                filterParameters={filterParameters}
                setFilterParameters={setFilterParameters}
                breeds={breeds}
              />
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Sexo</Text>
              <GenderFilter
                filterParameters={filterParameters}
                setFilterParameters={setFilterParameters}
              />
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Idade</Text>
              <AgeFilter
                minAge={minAge}
                maxAge={maxAge}
                filterParameters={filterParameters}
                setFilterParameters={setFilterParameters}
              />
            </View>
          </ScrollView>
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  sheetContent: {
    padding: 16,
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});