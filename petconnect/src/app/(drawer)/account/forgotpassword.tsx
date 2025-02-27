import { ThemedButton } from "@/src/components/ThemedButton";
import { ThemedInput } from "@/src/components/ThemedInput";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "../../(tabs)";
import { useState } from "react";

// type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function ForgotPassword() {
  // const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState("");

  const handleEnviar = () => {
    if (email.trim() !== "") {
      // @TODO enviar um email para troca de senha.
      // navigation.navigate("forgotstep");
    } else {
      Alert.alert("Erro", "O campo não pode estar vazio!");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.topSide}>
        <View style={styles.logo}>
          <Image
            source={require("@/assets/images/connect.png")}
            style={{ alignSelf: "center" }}
          />
        </View>
        <ThemedText
          type="title"
          style={[
            {
              color: styles.titleContainer.color,
              fontWeight: styles.titleContainer.fontWeight,
            },
          ]}
        >
          Recuperar Senha
        </ThemedText>
      </View>
      <View style={styles.container}>
        <ThemedInput value={email} onChangeText={setEmail} placeholder="Email">
          <Entypo name="mail" size={25} style={styles.icon} />
        </ThemedInput>
        <ThemedButton
          type="blue"
          title="Enviar"
          onPress={() => handleEnviar()}
        />
        <ThemedButton
          type="light"
          title="Voltar"
          // onPress={() => navigation.navigate("login")}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  topSide: {
    marginTop: "35%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    color: "#0496ff",
    fontWeight: 400,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logo: {
    height: 178,
    width: 178,
    margin: 10,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
});
