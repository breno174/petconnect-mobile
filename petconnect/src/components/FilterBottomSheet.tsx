import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { AgeFilter, GenderFilter, BreedFilter, SpeciesFilter } from './FilterOptions';
import { FilterProps } from '../interfaces/filterInterface';
import { ThemedButton } from './ThemedButton';

interface FilterDrawerProps {
  filterParameters: FilterProps;
  setFilterParameters: React.Dispatch<React.SetStateAction<FilterProps>>;
  species: string[];
  breeds: string[];
  minAge: number;
  maxAge: number;
}

export const FilterBottomSheet = forwardRef(({
  filterParameters,
  setFilterParameters,
  species,
  breeds,
  minAge,
  maxAge,
}: FilterDrawerProps, ref) => {
  const sheetRef = useRef<BottomSheet>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const snapPoints = useMemo(() => ["10%", "40%", "80%"], []);


  // const handleSheetChange = useCallback(() => {
  //   setIsSheetOpen(true);
  // }, []);
  useImperativeHandle(ref, () => ({
    close: () => {
      console.log('Calling close from parent');
      sheetRef.current?.close();
    },
    open: () => {
      sheetRef.current?.snapToIndex(2);
    }
  }));
  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);


  return (
    <>
      <Button title= {"Filtros"} onPress={() => handleSnapPress(2)} />
      <BottomSheet
        ref = {sheetRef}
        snapPoints={snapPoints}
        index = {-1}
        enableDynamicSizing={false}
        enablePanDownToClose={false}
      >
        <View style={styles.sheetContent}>
          <View style={styles.topContainer}>
            <Text style={styles.header}>Filtros</Text>
            <ThemedButton title='Concluir' type='blue-small' onPress={handleClosePress}/>
          </View>
          <ScrollView scrollEnabled={scrollEnabled} style={styles.scrollView}>
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
                setScrollEnabled={setScrollEnabled}
              />
            </View>
          </ScrollView>
        </View>
      </BottomSheet>
    </>
  );
});

const styles = StyleSheet.create({
  sheetContent: {
    padding: 15,
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
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});