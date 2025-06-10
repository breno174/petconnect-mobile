import { useAuthUserContext } from "@/src/context/authUserProvider";
import { UserData } from "@/src/interfaces/userInterface";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { removeToken } from "@/src/services/tokenService";
import { deletePet } from "@/src/api/delete-pet";
import { Pet } from "@/src/interfaces/petInterface";
import { getPetsUser } from "@/src/api/get-pets-user";
import { editPet } from "@/src/api/edit-pet";
import { PetImage } from "@/src/components/PetImage";
import { FontAwesome } from "@expo/vector-icons";
import { isLoading } from "expo-font";
import { usePetContext } from "@/src/context/petContext";

// const pets = [
//   {
//     name: "Teemo",
//     sex: "M",
//     breed: "Bulldogue",
//     image: require("@/assets/images/download.jpeg"),
//     petId: '404404404404'
//   },
//   {
//     name: "Bolt",
//     sex: "M",
//     breed: "Beagle",
//     image: require("@/assets/images/download.jpeg"),
//     petId: '404404404'
//   },
// ];

const AnimalCardProfile = ({ pet, onDelete, onEdit, }: { pet: Pet, onDelete?: () => void, onEdit?: () => void }) => {

  const genderFontColor = pet.gender === "FEMALE" ? "deeppink" : "blue";

  return (
    <View
      style={styles.card}
    >
      <PetImage petImageName={pet.image} petEdit={false} />
      <Text style={[styles.name, { color: genderFontColor }]}>{pet.name}</Text>
      <Text style={styles.breed}>
        {" "}
        Raça:
        <Text style={[styles.breed, { color: genderFontColor }]}>
          {" "}
          {pet.race}
        </Text>
      </Text>
      <Text style={styles.gender}>
        {" "}
        Sexo:
        <Text style={[styles.gender, { color: genderFontColor }]}>
          {" "}
          {pet.gender}
        </Text>
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.iconButton} onPress={onDelete}>
          <FontAwesome name="trash" size={24} color="#d9534f" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onEdit}>
          <FontAwesome name="pencil" size={24} color="#0496ff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const UserProfile = () => {
  const { currentUser } = useAuthUserContext();
  const [user, setUser] = useState<UserData | null>(null);
  const [pets, setPet] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const { refreshKey } = useLocalSearchParams();
  const {setSelectedPet} = usePetContext();
  const [carregando, setCarregando] = useState(false);

  const handleRefresh = () => {
    setCarregando(true);
    setTimeout(() => {
      fetchData();
      setCarregando(false);
    }, 2000);
  }

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const responseUser = await currentUser();
      console.log("responseUser", responseUser);
      setUser(responseUser);
      const petsData = await getPetsUser(responseUser.id);
      setPet(petsData)
      console.log("petsData", petsData)
      setIsLoading(false)
    } catch (error) {
      console.log({ error: error });
      await removeToken();
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  function onDeletePetClick(id: string) {
    setIsLoading(true)
    deletePet(id)
      .then(fetchData)
      .catch(error => console.log(error))
  }

  function onEditPetClick(pet: Pet) {
    setSelectedPet(pet)
    router.push(`/(drawer)/home/profileActions/${pet.id.toString()}`);
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require("@/assets/images/instrutor.jpeg")}
          style={styles.profileImage}
        />
        <View style={styles.profileHeaderText}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userRole}>
            {user?.enabled ? "disponível" : "ocupado"}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Objetivos:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • Encontrar um parceiro para reprodução para seus cães, Bolt e Luna.
          </Text>
          <Text style={styles.listItem}>
            • Ampliar sua família peluda com filhotes saudáveis e ativos.
          </Text>
          <Text style={styles.listItem}>
            • Conectar-se com outros donos de cães apaixonados por atividades ao
            ar livre.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hobbies:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • Passear com Bolt e Luna em trilhas e parques.
          </Text>
          <Text style={styles.listItem}>
            • Praticar esportes com seus cães, como corrida, natação e agility.
          </Text>
          <Text style={styles.listItem}>
            • Participar de competições de cães e eventos para donos de animais.
          </Text>
          <Text style={styles.listItem}>
            • Compartilhar fotos e vídeos de suas aventuras com os cães nas
            redes sociais.
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.botaoFlutuante}
        onPress={handleRefresh}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.iconeBotao}>↻</Text>
        )}
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PETS 🐾</Text>
        {isLoading? 
        (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Procurando pets...</Text>
              </View>
            )
            :
            (

        <View style={styles.petsContainer}>
          {pets.map((pet, index) => (
            <AnimalCardProfile key={index} pet={pet} onEdit={() => onEditPetClick(pet)} onDelete={() => onDeletePetClick(pet.id.toString())} />
          ))}
        </View>
            )
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  profileHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  profileHeaderText: {
    marginLeft: 18,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  userRole: {
    fontSize: 14,
    color: "gray",
  },
  botaoFlutuante: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    right: 17,
    bottom: 17,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1000,
  },
  iconeBotao: {
    fontSize: 24,
    color: '#ffffff',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  list: {
    paddingLeft: 10,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  petsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  petCard: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  petImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  petName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  listContainer: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    padding: 1,
    paddingBottom: 10,
    width: "48%",
    marginHorizontal: "1%",
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 130,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  breed: {
    fontSize: 16,
    marginBottom: 5,
  },
  gender: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    gap: "15%",
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default UserProfile;
