import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const PetProfile = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/download.jpeg")}
          style={styles.petImage}
        />
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
            <Text style={styles.petName}>Bidu</Text>
            <Text style={styles.petBreed}>Maltês ♂</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.verifyButton}>
              <Text style={styles.verifyText}>Verificar Vacinas</Text>
            </TouchableOpacity>
            <View style={styles.petDetails}>
              <Text style={styles.detailItem}>5 kg</Text>
              <Text style={styles.detailItem}>12/02/24</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.description}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. It has survived not only five centuries, but also the leap
        into electronic typesetting.
      </Text>

      <TouchableOpacity style={styles.matchButton}>
        <Text style={styles.matchText}>Match</Text>
      </TouchableOpacity>

      <View style={styles.ownerContainer}>
        <Image
          source={require("@/assets/images/download.jpeg")}
          style={styles.ownerImage}
        />
        <View>
          <Text style={styles.ownerName}>Mark William</Text>
          <Text style={styles.ownerMember}>Membro desde 05/02/2024</Text>
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
});

export default PetProfile;
