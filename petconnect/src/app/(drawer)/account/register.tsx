import { ThemedView } from "@/src/components/ThemedView";
import { ThemedInput } from "@/src/components/ThemedInput";
import { ThemedButton } from "@/src/components/ThemedButton";
import { ThemedText } from "@/src/components/ThemedText";
import { Image, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "../../(tabs)";
import { useState } from "react";

// type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function Register() {
  // const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  return (
    <ThemedView style={styles.container}>
      <View>
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
          Cadastro Usuário
        </ThemedText>

        <View style={styles.container}>
          <ThemedInput value={nome} onChangeText={setNome} placeholder="Nome">
            <Entypo name="user" size={25} style={styles.icon} />
          </ThemedInput>
          <ThemedInput
            value={email}
            onChangeText={setEmail}
            placeholder="email"
          >
            <Entypo name="mail" size={25} style={styles.icon} />
          </ThemedInput>
          <ThemedInput value={cpf} onChangeText={setCpf} placeholder="cpf">
            <Entypo name="user" size={25} style={styles.icon} />
          </ThemedInput>
          <ThemedInput
            value={telefone}
            onChangeText={setTelefone}
            placeholder="telefone"
          >
            <Entypo name="phone" size={25} style={styles.icon} />
          </ThemedInput>
          <ThemedInput
            value={senha}
            onChangeText={setSenha}
            placeholder="Senha"
          >
            <Entypo name="lock" size={25} style={styles.icon} />
          </ThemedInput>
          <ThemedInput
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            placeholder="confirmarSenha"
          >
            <Entypo name="text" size={25} style={styles.icon} />
          </ThemedInput>

          <ThemedButton
            type="blue"
            title="Cadastrar"
            // onPress={() => navigation.navigate("login")}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 3,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
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
    marginLeft: 10,
    marginRight: 10,
  },
});
