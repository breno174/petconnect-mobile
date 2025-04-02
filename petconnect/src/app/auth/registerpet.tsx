import { ThemedView } from "@/src/components/ThemedView";
import { ThemedInput } from "@/src/components/ThemedInput";
import { ThemedButton } from "@/src/components/ThemedButton";
import { ThemedText } from "@/src/components/ThemedText";
import { Image, View, StyleSheet, Alert, Platform, TouchableOpacity, Text, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRouter } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { SetStateAction, useState } from "react";
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
    const [gender, setGender] = useState('MALE')
    const [birthDate, setBirthDate] = useState('')
    const [specie, setSpecie] = useState('')
    const [race, setRace] = useState('')
   

    async function Cadastrar() {
        const postData ={
            name, 
            gender,
            birthDate,
            specie,
            race
        }
        console.log('postData', postData)

       
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
                          style={styles.titleContainer}
                        >Cadastro PET
                        </ThemedText>

                <View style={styles.container}>
                <input
                            type="date"
                            value={birthDate} // Converte para string YYYY-MM-DD
                            onChange={(e) => setBirthDate(e.target.value)} // Correção aqui
                            style={{ borderWidth: 1, padding: 8, borderRadius: 5 }}
                        />

                        <View style={styles.genderContainer}>
                        
                        <TouchableOpacity 
                            style={[styles.radioButton, gender === 'MALE' && styles.selected]}
                            onPress={() => setGender('MALE')}
                        >
                            <Entypo name="man" size={20} color={gender === 'MALE' ? 'blue' : 'gray'} />
                            <Text style={styles.radioText}>MACHO</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.radioButton, gender === 'FEMALE' && styles.selected]}
                            onPress={() => setGender('FEMALE')}
                        >
                            <FontAwesome5 name="female" size={20} color={gender === 'FEMALE' ? 'pink' : 'gray'} />
                            <Text style={styles.radioText}>FÊMEA</Text>
                        </TouchableOpacity>
                    </View>
                       

                        <ThemedInput placeholder="Nome" value={name} onChangeText={setName}>
                            <Entypo name="user" size={25} style={styles.icon} />
                        </ThemedInput>
                        {/* <ThemedInput placeholder="Genero" value={gender} onChangeText={setGender}>
                            <Entypo name="users" size={25} style={styles.icon} />
                        </ThemedInput> */}
                        {/* <ThemedInput placeholder="Aniversário" value={birthDate} onChangeText={setBirthDate}>
                            <Entypo name="calendar" size={25} style={styles.icon} />
                        </ThemedInput> */}
                           {/* Aniversário (Date Picker) */}
                          
                       
                       
    
  
                                
                        <ThemedInput placeholder="Especie" value={specie} onChangeText={setSpecie}>
                            <Entypo name="feather" size={25} style={styles.icon} />
                        </ThemedInput>
                        <ThemedInput placeholder="Raça" value={race} onChangeText={setRace}>
                            <Entypo name="v-card" size={25} style={styles.icon} />
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
        margin: "auto",
        justifyContent:"center",
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
    },
    genderContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginVertical: 10 },
    label: { 
        fontSize: 16,
         marginRight: 10 },
    radioButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10, borderWidth: 1, 
        borderRadius: 5, 
        marginRight: 10 },
    selected: { 
        borderColor: 'blue', 
        backgroundColor: '#E0F7FA' },
    radioText: { 
        marginLeft: 5 },
    dateInput: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10, 
        borderWidth: 1,
        borderRadius: 5, 
        marginVertical: 10 },
})