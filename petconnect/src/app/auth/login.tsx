import { ThemedView } from "@/src/components/ThemedView";
import { ThemedInput } from "@/src/components/ThemedInput";
import { ThemedButton } from "@/src/components/ThemedButton";
import { ThemedText } from "@/src/components/ThemedText";
import { Image, View, StyleSheet, Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAuthUserContext } from "@/src/context/authUserProvider";
import { LoginProps } from "@/src/interfaces/userInterface";
import React from "react";

// type RootStackParamList = {
//     login: undefined,
//     forgotpassword: undefined,
//     register: undefined,

// }
// type  ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList,"login">

export default function Login() {
  // const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const { login, currentUser } = useAuthUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchData = async () => {
    console.log("fetch");

    try {
      const responseUser = await currentUser();
      console.log("responseUser", responseUser);
      // setUser(responseUser);
      // const datePets = await getPetsUser(responseUser.data.id);
    } catch (error) {
      console.log({ error: error });
    }
  };
  // useEffect(() => {
  //   console.log("ocorre");

  //   fetchData();
  // });

  async function Logar() {
    if (email === "" || password === "") {
      if (Platform.OS === "web") {
        window.alert("Preencha todos os campos!");
      } else {
        Alert.alert("Preencha todos os campos!");
      }
      return;
    }

    const postData = { email: email, password: password } as LoginProps;

    console.log("postData", postData);

    try {
      await login(postData);
      await fetchData();
      // const response = await axios.post('http://localhost:8080/auth/login', postData)
      // const token = response.data.token
      // console.log('Token recebido:', response.data);
      router.replace("/(drawer)/homeScreen");

      // if (Platform.OS === 'web') {

      //     localStorage.setItem('authToken', token);
      // } else {

      //     await AsyncStorage.setItem('authToken', token);
      // }

      // navigation.navigate('forgotpassword');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Erro no Axios:", error.response?.data || error.message);
      } else {
        console.error("Erro desconhecido:", error);
      }
      if (Platform.OS === "web") {
        window.alert("Erro ao fazer login. Tente novamente.");
      } else {
        Alert.alert("Erro ao fazer login. Tente novamente.");
      }
    }
  }
  return (
    <ThemedView style={styles.container}>
      <View>
        <View style={styles.logo}>
          <Image
            source={require("@/assets/images/connect.png")}
            style={{ alignSelf: "center" }}
          />
        </View>

        <View style={styles.container}>
          <ThemedInput
            placeholder="Login"
            value={email}
            onChangeText={setEmail}
          >
            <Entypo name="user" size={25} style={styles.icon} />
          </ThemedInput>
          <ThemedInput
            placeholder="Senha"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          >
            <Entypo name="lock" size={25} style={styles.icon} />
          </ThemedInput>

          <ThemedButton
            type="light"
            title="Cadastrar-se"
            onPress={() => router.push("/auth/register")}
          />
         
          <ThemedButton
            type="light"
            title="Recuperar Senha"
            onPress={() => router.push("/auth/forgotpassword")}
          />
          <ThemedButton type="blue" title="Entrar" onPress={Logar} />
        </View>
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
