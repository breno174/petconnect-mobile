import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Pet } from '../interfaces/petInterface';
import { PetImage } from './PetImage';

const AnimalCard = ({ pet }: { pet: Pet }) => {

  const genderFontColor = pet.gender === 'FEMALE' ? 'deeppink' : 'blue';

  return(
  
  <View style={styles.card}>
    <PetImage petImageName={pet.image}/>
    <Text style={[styles.name, { color: genderFontColor }]}>{pet.name}</Text>
    <Text style={styles.breed}> Raça:
      <Text style={[styles.breed, { color: genderFontColor }]}> {pet.race}</Text>
    </Text>
    <Text style={styles.gender}> Sexo:
      <Text style={[styles.gender, { color: genderFontColor }]}> {pet.gender}</Text>
    </Text>
  </View>
)};

const AnimalCardList = ({ petList }: { petList: Pet[] }) => {
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      <View style={styles.row}>
        {petList.map((pet: Pet) => (
          <AnimalCard key={pet.id} pet={pet} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 1,
    paddingBottom: 10,
    width: '48%',
    marginHorizontal: '1%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 130,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },
  breed: {
    fontSize: 16,
    marginBottom: 5,
  },
  gender: {
    fontSize: 16,
  },
});

export default AnimalCardList;
