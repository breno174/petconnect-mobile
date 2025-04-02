import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { Modal, Button, TextInput } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { FilterProps } from '../interfaces/filterInterface';
import { Ionicons } from '@expo/vector-icons';

interface AgeFilterProps {
  filterParameters: FilterProps;
  setFilterParameters: React.Dispatch<React.SetStateAction<FilterProps>>;
  minAge: number;
  maxAge: number;
}

export const AgeFilter: React.FC<AgeFilterProps> = ({
  filterParameters,
  setFilterParameters,
  minAge,
  maxAge,
}) => {
  const handleValueChange = (newValues: number[]) => {
    setFilterParameters({ ...filterParameters, ageRange: newValues as [number, number] });
  };

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.label}>Selecione as idades</Text>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={minAge}
          maximumValue={maxAge}
          step={1}
          value={filterParameters.ageRange[0]}
          onValueChange={(value: number) => handleValueChange([value, filterParameters.ageRange[1]])}
        />
        <Slider
          style={styles.slider}
          minimumValue={minAge}
          maximumValue={maxAge}
          step={1}
          value={filterParameters.ageRange[1]}
          onValueChange={(value: number) => handleValueChange([filterParameters.ageRange[0], value])}
        />
      </View>
      <View style={styles.ageValues}>
        <Text>{filterParameters.ageRange[0]} years</Text>
        <Text>{filterParameters.ageRange[1]} years</Text>
      </View>
    </View>
  );
};

interface BreedFilterProps {
  filterParameters: FilterProps;
  setFilterParameters: React.Dispatch<React.SetStateAction<FilterProps>>;
  breeds: string[];
}

export const BreedFilter: React.FC<BreedFilterProps> = ({ filterParameters, setFilterParameters, breeds }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.selectButtonText}>
          {filterParameters.race ? filterParameters.race : 'Selecione uma raça'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="gray" />
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Procure uma raça..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Picker
              selectedValue={filterParameters.race}
              style={styles.picker}
              onValueChange={(itemValue: string) => {
                setFilterParameters({ ...filterParameters, race: itemValue });
                setModalVisible(false);
              }}
            >
              <Picker.Item label="Selecione uma raça" value={null} />
              {filteredBreeds.map((breed) => (
                <Picker.Item key={breed} label={breed} value={breed} />
              ))}
            </Picker>
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Button title="Limpar" onPress={() => setFilterParameters({ ...filterParameters, race: '' })} />
    </View>
  );
};

interface SpeciesFilterProps {
  filterParameters: FilterProps;
  setFilterParameters: React.Dispatch<React.SetStateAction<FilterProps>>;
  species: string[];
}

export const SpeciesFilter: React.FC<SpeciesFilterProps> = ({ filterParameters, setFilterParameters, species }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredSpecies = species.filter((specie) =>
    specie.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.selectButtonText}>
          {filterParameters.species ? filterParameters.species : 'Selecione uma espécie'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="gray" />
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Procurar espécie..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Picker
              selectedValue={filterParameters.species}
              style={styles.picker}
              onValueChange={(itemValue: string) => {
                setFilterParameters({ ...filterParameters, species: itemValue });
                setModalVisible(false);
              }}
            >
              <Picker.Item label="Selecione uma espécie" value={null} />
              {filteredSpecies.map((specie) => (
                <Picker.Item key={specie} label={specie} value={specie} />
              ))}
            </Picker>
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Button title="Limpar" onPress={() => setFilterParameters({ ...filterParameters, species: '' })} />
    </View>
  );
};

interface GenderFilterProps {
    filterParameters: FilterProps;
    setFilterParameters: React.Dispatch<React.SetStateAction<FilterProps>>;
  }
  
  export const GenderFilter: React.FC<GenderFilterProps> = ({ filterParameters, setFilterParameters }) => {
    const handleValueChange = (selectedIndex: number) => {
      let newValue: 'ALL' | 'MALE' | 'FEMALE' = 'ALL'; // Default to ALL
  
      if (selectedIndex === 1) {
        newValue = 'FEMALE';
      } else if (selectedIndex === 2) {
        newValue = 'MALE';
      }
  
      setFilterParameters({ ...filterParameters, gender: newValue });
    };
  
    const selectedIndex = () => {
      if (filterParameters.gender === 'FEMALE') {
        return 1;
      } else if (filterParameters.gender === 'MALE') {
        return 2;
      } else {
        return 0; // Default to ALL
      }
    };
  
    return (
      <View style={styles.filterContainer}>
        <Text style={styles.label}>Selecione o sexo</Text>
        <SegmentedControl
          values={['All', 'Female', 'Male']}
          selectedIndex={selectedIndex()}
          onChange={(event) => {
            handleValueChange(event.nativeEvent.selectedSegmentIndex);
          }}
        />
      </View>
    );
  };

const styles = StyleSheet.create({
  filterContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sliderContainer: {
    flexDirection: 'column',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  ageValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  selectButtonText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
  },
  picker: {
    height: 150,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
  },
});