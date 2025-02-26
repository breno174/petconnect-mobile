import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const animalData = [
  {
    id: '1',
    name: 'Bella',
    breed: 'Labrador',
    gender: 'Female',
    image: require("../../assets/images/download.jpeg"),
  },
  {
    id: '2',
    name: 'Max',
    breed: 'German Shepherd',
    gender: 'Male',
    image: require("../../assets/images/download.jpeg"),
  },
  {
    id: '3',
    name: 'Oliver',
    breed: 'Bulldog',
    gender: 'Male',
    image: require("../../assets/images/download.jpeg"),
  },
  {
    id: '4',
    name: 'Luna',
    breed: 'Golden Retriever',
    gender: 'Female',
    image: require("../../assets/images/download.jpeg"),
  },
];

const AnimalCard = ({ animal }: { animal: typeof animalData[0] }) => {

  const genderFontColor = animal.gender === 'Female' ? 'deeppink' : 'blue';

  return(
  
  <View style={styles.card}>
    <Image source={animal.image} style={styles.image} />
    <Text style={[styles.name, { color: genderFontColor }]}>{animal.name}</Text>
    <Text style={styles.breed}> Raça:
      <Text style={[styles.breed, { color: genderFontColor }]}> {animal.breed}</Text>
    </Text>
    <Text style={styles.gender}> Sexo:
      <Text style={[styles.gender, { color: genderFontColor }]}> {animal.gender}</Text>
    </Text>
  </View>
)};

const AnimalCardList = () => {
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      <View style={styles.row}>
        {animalData.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
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
