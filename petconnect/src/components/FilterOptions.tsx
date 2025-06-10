import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { FilterProps } from '../interfaces/filterInterface';
import { ThemedButton } from './ThemedButton';
// import { Ionicons } from '@expo/vector-icons';

interface AgeFilterProps {
  filterParameters: FilterProps;
  setFilterParameters: React.Dispatch<React.SetStateAction<FilterProps>>;
  setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  minAge: number;
  maxAge: number;
}

export const AgeFilter: React.FC<AgeFilterProps> = ({
  filterParameters,
  setFilterParameters,
  minAge,
  maxAge,
  setScrollEnabled
}) => {
  const handleValueChange = (newValues: number[]) => {
    const newMinAge = newValues[0];
    const newMaxAge = newValues[1];
  
    setFilterParameters({
      ...filterParameters,
      ageRange: [Math.min(newMinAge, newMaxAge), Math.max(newMinAge, newMaxAge)] as [number, number],
    });
  };

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.label}></Text>
      <View style={styles.sliderContainer}>
      <View style={styles.ageValues}>
        <Text>{filterParameters.ageRange[0]} years</Text>
        <Text>{filterParameters.ageRange[1]} years</Text>
      </View>
        <Slider
          onSlidingStart={() => setScrollEnabled(false)}
          onSlidingComplete={() => setScrollEnabled(true)}
          style={styles.slider}
          minimumValue={minAge}
          maximumValue={maxAge}
          step={1}
          value={filterParameters.ageRange[0]}
          onValueChange={(value: number) => handleValueChange([value, filterParameters.ageRange[1]])}
        />
        <Slider
          onSlidingStart={() => setScrollEnabled(false)}
          onSlidingComplete={() => setScrollEnabled(true)}
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

const BreedClearButton: React.FC<BreedFilterProps> = ({ filterParameters, setFilterParameters}) => {
  if(!(filterParameters.race == '')){
    return <Button title="Limpar" onPress={() => setFilterParameters({ ...filterParameters, race: '' })} />
  }
}

export const BreedFilter: React.FC<BreedFilterProps> = ({ filterParameters, setFilterParameters, breeds }) => {

  return (
    <View style={styles.filterContainer}>
      <Picker
        selectedValue={filterParameters.race}
        style={styles.picker}
        onValueChange={(itemValue: string) => {
          setFilterParameters({ ...filterParameters, race: itemValue });
        }}
      >
        <Picker.Item label="Selecione uma raça" value={null} />
        {breeds.map((breed) => (
          <Picker.Item key={breed} label={breed} value={breed} />
        ))}
      </Picker>
      {/* <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.selectButtonText}>
          {filterParameters.race ? filterParameters.race : 'Selecione uma raça'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="gray" />
      </TouchableOpacity>

      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
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
      </Modal> */}

      <BreedClearButton filterParameters={filterParameters} setFilterParameters={setFilterParameters} breeds={breeds}/>
    </View>
  );
};

interface SpeciesFilterProps {
  filterParameters: FilterProps;
  setFilterParameters: React.Dispatch<React.SetStateAction<FilterProps>>;
  species: string[];
}

const SpeciesClearButton: React.FC<SpeciesFilterProps> = ({ filterParameters, setFilterParameters}) => {
  if(!(filterParameters.species == '')){
    return(
      <View style={styles.selectButton}>
        <ThemedButton type="red" title="Limpar"  onPress={() => setFilterParameters({ ...filterParameters, species: '' })} />
      </View>
   )
  }
}
export const SpeciesFilter: React.FC<SpeciesFilterProps> = ({ filterParameters, setFilterParameters, species }) => {

  return (
    <View style={styles.filterContainer}>
      <Picker
        selectedValue={filterParameters.species}
        style={styles.picker}
        onValueChange={(itemValue: string) => {
          setFilterParameters({ ...filterParameters, species: itemValue });
        }}
      >
        <Picker.Item label="Selecione uma espécie" value={null} />
        {species.map((specie) => (
          <Picker.Item key={specie} label={specie} value={specie} />
        ))}
      </Picker>
      {/* <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.selectButtonText}>
          {filterParameters.species ? filterParameters.species : 'Selecione uma espécie'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="gray" />
      </TouchableOpacity>

      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Procurar espécie..."
              value={searchQuery}
              onChangeText={() => {
                setSearchQuery;
              }}
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
      </Modal> */}

      <SpeciesClearButton filterParameters={filterParameters} setFilterParameters={setFilterParameters} species={species} />
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

    if (selectedIndex === 2) {
      newValue = 'FEMALE';
    } else if (selectedIndex === 1) {
      newValue = 'MALE';
    }

    setFilterParameters({ ...filterParameters, gender: newValue });
  };

  const selectedIndex = () => {
    if (filterParameters.gender === 'FEMALE') {
      return 2;
    } else if (filterParameters.gender === 'MALE') {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <View style={styles.filterContainer}>
      <SegmentedControl
        values={['Todos', 'Macho', 'Fêmea']}
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
    marginHorizontal: 5,
    paddingHorizontal: 10
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
    height: 25,
  },
  ageValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectButton: {
    width: '25%',
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
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
  },
});