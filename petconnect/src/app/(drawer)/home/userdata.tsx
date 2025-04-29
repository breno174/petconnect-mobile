import { useAuthUserContext } from "@/src/context/authUserProvider";
import { UserData } from "@/src/interfaces/userInterface";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { removeToken } from "@/src/services/tokenService";

const pets = [
  {
    name: "Teemo",
    sex: "M",
    breed: "Bulldogue",
    image: require("@/assets/images/download.jpeg"),
  },
  {
    name: "Bolt",
    sex: "M",
    breed: "Beagle",
    image: require("@/assets/images/download.jpeg"),
  },
];

const PetCard = ({
  name,
  sex,
  breed,
  image,
}: {
  name: string;
  sex: string;
  breed: string;
  image: any;
}) => {
  return (
    <View style={styles.petCard}>
      <Image source={image} style={styles.petImage} />
      <Text style={styles.petName}>
        Nome: <Text style={styles.bold}>{name}</Text>
      </Text>
      <Text>
        Sexo: <Text style={styles.bold}>{sex}</Text>
      </Text>
      <Text>
        Raça: <Text style={styles.bold}>{breed}</Text>
      </Text>
    </View>
  );
};

const UserProfile = () => {
  const { currentUser } = useAuthUserContext();
  const [user, setUser] = useState<UserData | null>(null);

  const fetchData = async () => {
    try {
      const responseUser = await currentUser();
      console.log("responseUser", responseUser);
      setUser(responseUser);
      // const datePets = await getPetsUser(responseUser.data.id);
    } catch (error) {
      console.log({ error: error });
      await removeToken();
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PETS 🐾</Text>
        <View style={styles.petsContainer}>
          {pets.map((pet, index) => (
            <PetCard key={index} {...pet} />
          ))}
        </View>
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
});

export default UserProfile;
