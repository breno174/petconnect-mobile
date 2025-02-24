import { ThemedView } from "@/src/components/ThemedView";
import { ThemedInput } from "@/src/components/ThemedInput";
import { ThemedButton } from "@/src/components/ThemedButton";
import { ThemedText } from "@/src/components/ThemedText";
import { Image, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "expo-router";


export default function Login(){
    const navigation = useNavigation();
    return(
        <ThemedView style={styles.container}>
            <View>
                <View style={styles.logo}>
                          <Image
                            source={require("@/assets/images/connect.png")}
                            style={{ alignSelf: "center" }}
                          />
                </View>

                <View style={styles.container}>
                        <ThemedInput placeholder="Login">
                            <Entypo name="user" size={25} style={styles.icon} />
                        </ThemedInput>
                        <ThemedInput placeholder="Senha">
                            <Entypo name="lock" size={25} style={styles.icon} />
                        </ThemedInput>
                          
                        <ThemedButton type="light" title="Cadastrar-se" onPress={()=>navigation.navigate('register')} />
                        <ThemedButton type="light" title="Recuperar Senha" onPress={()=>navigation.navigate('forgotpassword')} />
                        <ThemedButton type="blue" title="Entrar" />
                        
                </View>

            </View>
        </ThemedView>
    )
}
const styles = StyleSheet.create({
    container:{
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
    icon:{
        marginLeft:10,
        marginRight:10
    }
})