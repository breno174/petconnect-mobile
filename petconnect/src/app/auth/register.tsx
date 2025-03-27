import { ThemedView } from "@/src/components/ThemedView";
import { ThemedInput } from "@/src/components/ThemedInput";
import { ThemedButton } from "@/src/components/ThemedButton";
import { ThemedText } from "@/src/components/ThemedText";
import { Image, View, StyleSheet, Alert, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import axios, {AxiosError} from "axios";

// type RootStackParamList ={
//     register: undefined,
//     login: undefined
// }

// type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, "register">


export default function Register(){
    // const navigation = useNavigation<RegisterScreenNavigationProp>();
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    async function Cadastrar() {
        const postData ={
            name, 
            email,
            phone,
            cpf,
            password,
            confirmPassword
        }
        console.log('postData', postData)

        try {
            const response = await axios.post('http://localhost:8080/user', postData)
        
            console.log('response', response.data);

          

            router.replace('/auth/login')

        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Erro no Axios:', error.response?.data || error.message);
            } else {
                console.error('Erro desconhecido:', error);
            }
            if (Platform.OS === 'web') {
                window.alert('Erro ao fazer login. Tente novamente.');
            } else {
                Alert.alert('Erro ao fazer login. Tente novamente.');
            }
        }

        // navigation.navigate('login')
    }

    return(
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
                        <ThemedInput placeholder="Nome" value={name} onChangeText={setName}>
                            <Entypo name="user" size={25} style={styles.icon} />
                        </ThemedInput>
                        <ThemedInput placeholder="email" value={email} onChangeText={setEmail}>
                            <Entypo name="mail" size={25} style={styles.icon} />
                        </ThemedInput>
                        <ThemedInput placeholder="cpf" value={cpf} onChangeText={setCpf}>
                            <Entypo name="user" size={25} style={styles.icon} />
                        </ThemedInput>
                        <ThemedInput placeholder="telefone" value={phone} onChangeText={setPhone}>
                            <Entypo name="phone" size={25} style={styles.icon} />
                        </ThemedInput>
                        <ThemedInput placeholder="Senha" secureTextEntry={true} value={password} onChangeText={setPassword}>
                            <Entypo name="lock" size={25} style={styles.icon} />
                        </ThemedInput>
                        <ThemedInput placeholder="confirmarSenha" secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword}>
                            <Entypo name="text" size={25} style={styles.icon} />
                        </ThemedInput>
                          
                       
                        <ThemedButton type="blue" title="Cadastrar" onPress={Cadastrar} />
                        
                </View>

            </View>
        </ThemedView>
    )
}
const styles = StyleSheet.create({
    container:{
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
    icon:{
        marginLeft:10,
        marginRight:10
    }
})