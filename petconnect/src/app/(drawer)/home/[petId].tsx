import { PetImage } from "@/src/components/PetImage";
import { usePetContext } from "@/src/context/petContext";
import { Pet } from "@/src/interfaces/petInterface";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";

const PetProfile = () => {
  const router = useRouter();
  // const { petId } = useLocalSearchParams();
  // const [pet, setPet] = useState<Pet | null>(null);
  // const [loading, setLoading] = useState(true);
  const { selectedPet } = usePetContext();
  const redirectToUser = async () => {
    if (selectedPet?.user.id) {
      router.replace(`/home/chatscreenconversation/${selectedPet.user.id}`);
    }
  }
  const defaultIMG = require('../../../../assets/images/download.jpeg')

  // useEffect(() => {
  //   const fetchPetData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:8080/pet/${petId}`);
  //       const data = await response.json();
  //       console.log({ data: data });
  //       console

  //       setPet(data);
  //     } catch (error) {
  //       console.error("Erro ao buscar dados do pet:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (petId) {
  //     fetchPetData();
  //   }
  // }, [petId]);

  return (
    <View>
      {selectedPet ? (
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            {(selectedPet.image && selectedPet.image.includes("supabase.co")) ?
              (
                <Image source={{ uri: selectedPet.image }} style={styles.petImage}/>
              ): (
                  <Image source = { defaultIMG } style = {styles.petImage}/>
            )
              }
            {/* {pet?.image ? (
          <PetImage petImageName={pet.image} petEdit={false} />
        ) : (
          <View style={styles.loadingContainer}>
                          <ActivityIndicator size="large" color="#0000ff" />
                        </View>
        )} */}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                paddingRight: "15%",
                paddingLeft: "15%",
              }}
            >
              <View>
                <Text style={styles.petName}>{selectedPet?.name}</Text>
                <Text style={styles.petBreed}>{selectedPet?.race}</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.verifyButton}>
                  <Text style={styles.verifyText}>Verificar Vacinas</Text>
                </TouchableOpacity>
                <View style={styles.petDetails}>
                  <Text style={styles.detailItem}>{selectedPet?.gender}</Text>
                  <Text style={styles.detailItem}>{selectedPet?.birthDate}</Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. It has survived not only five centuries, but also the leap
            into electronic typesetting.
          </Text>

          <TouchableOpacity onPress={() => redirectToUser()} style={styles.matchButton}>
            <Text style={styles.matchText}>Match</Text>
          </TouchableOpacity>

          <View style={styles.ownerContainer}>
            <Image
              source={require("@/assets/images/download.jpeg")}
              style={styles.ownerImage}
            />
            <View>
              <Text style={styles.ownerName}>{selectedPet?.user.name}</Text>
              <Text style={styles.ownerMember}>{selectedPet?.user.username}</Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <Text> Erro ao acessar a página do Pet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    alignItems: "center",
  },
  petImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  petName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  petBreed: {
    fontSize: 18,
    color: "gray",
  },
  verifyButton: {
    backgroundColor: "#68a0cf",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  verifyText: {
    color: "#fff",
    fontSize: 14,
  },
  petDetails: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: "auto",
  },
  detailItem: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  description: {
    textAlign: "left",
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 20,
    justifyContent: "center",
    marginVertical: 25,
  },
  matchButton: {
    backgroundColor: "#68a0cf",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 20,
  },
  matchText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  ownerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  ownerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ownerMember: {
    fontSize: 14,
    color: "gray",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default PetProfile;
