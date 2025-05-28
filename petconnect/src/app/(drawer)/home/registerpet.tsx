import { ThemedView } from "@/src/components/ThemedView";
import { ThemedInput } from "@/src/components/ThemedInput";
import { ThemedButton } from "@/src/components/ThemedButton";
import { ThemedText } from "@/src/components/ThemedText";
import { Image, View, StyleSheet, Alert, Platform, TouchableOpacity, Text, TextInput, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRouter } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { SetStateAction, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import * as ImagePicker from 'expo-image-picker';
import { useAuthUserContext } from "../../../context/authUserProvider";
import { PetBody } from "@/src/interfaces/petBodyInterface";
import { createPet } from "@/src/api/create-pet";
import { uploadPetImage } from "@/src/api/upload-pet-image";

// import { UserData } from "@/src/interfaces/userInterface";




// type RootStackParamList ={
//     register: undefined,
//     login: undefined
// }

// type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, "register">


export default function Register() {
    // const navigation = useNavigation<RegisterScreenNavigationProp>();
    const router = useRouter()
    // const [name, setName] = useState('')
    // const [gender, setGender] = useState('MALE')
    // const [birthDate, setBirthDate] = useState('')
    // const [specie, setSpecie] = useState('')
    // const [race, setRace] = useState('')
    const [petBody, setPetBody] = useState<PetBody>({
        name: '',
        gender: 'MALE',
        birthDate: new Date(),
        specie: '',
        race: ''
    });
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState('');

    // let userLogin: { id: number } 

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert('Permission required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const picked = result.assets[0].uri;
            setImage(picked);
        }
    };

    async function Cadastrar() {

        // if (Platform.OS === 'web') {

        // const storedUser = localStorage.getItem('userLogin');
        //     userLogin = storedUser ? JSON.parse(storedUser) : null;
        // } else {
        //     const storedUser = await AsyncStorage.getItem('userLoginMobile');
        //     userLogin = storedUser ? JSON.parse(storedUser) : null;
        // }

        // const postData ={
        //     name, 
        //     gender,
        //     birthDate,
        //     specie,
        //     race,
        //     user:{
        //         id: userLogin.id
        //     }
        // }
        // console.log('postData', postData)



        try {

            if (!image) {
                if (Platform.OS === "web") {
                    window.alert("Necessário uma foto para cadastrar o Pet.");
                } else {
                    Alert.alert("Necessário uma foto para cadastrar o Pet.");
                }
                return;
            }
            setLoading(true)
            const response = await createPet(petBody)

            console.log('response', response.data);


            const formData = new FormData();
            const responseImage = await fetch(image);
            const blob = await responseImage.blob()
            // const file = {
            //     uri: image,
            //     name: `pet-${response.data.id}.jpg`, // Use a meaningful name
            //     type: blob.type || 'image/jpeg', // Fallback to JPEG if type is unknown
            // };

            const petId = response.data.id

            formData.append("file", blob, `pet-${petId}.jpg`); // Use 'file' to match backend

            await uploadPetImage(formData, petId).catch(error => console.log(error))
            await uploadPetImage(formData, petId).catch(error => console.log(error))

            setPetBody({
                name: '',
                gender: 'MALE',
                birthDate: new Date(),
                specie: '',
                race: ''
            })

            setImage(null)

            setLoading(false)
            router.replace({ pathname: "/(drawer)/home/userdata", params: { refreshKey: Date.now().toString() } });

        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Erro no Axios:', error.response?.data || error.message);
            } else {
                console.error('Erro desconhecido:', error);
            }
            if (Platform.OS === 'web') {
                window.alert('Erro ao fazer cadastro. Tente novamente.');
            } else {
                Alert.alert('Erro ao fazer cadastro. Tente novamente.');
            }
        }


    }

    return (
        <ThemedView style={styles.container}>


            <View>
                <View style={styles.logoContainer}>
                    <TouchableOpacity onPress={pickImage}>
                        <Image
                            source={
                                image
                                    ? { uri: image }
                                    : require("@/assets/images/connectAdd.png")
                            }
                            style={styles.logo}
                            resizeMode="cover"
                        />
                        <Text style={styles.text}>Clique para adicionar uma foto!</Text>
                    </TouchableOpacity>

                </View>
                {/* <ThemedText
                    type="title"
                    style={styles.titleContainer}
                >Cadastro PET
                </ThemedText> */}

                <View style={styles.container}>
                    <input
                        type="date"
                        value={petBody.birthDate.toISOString().slice(0, 10)}
                        onChange={(e) => {
                            const newDate = new Date(e.target.value);
                            setPetBody({ ...petBody, birthDate: newDate });
                        }}
                        style={{ height: 20, borderWidth: 1, padding: 8, borderRadius: 5 }}
                    />

                    <View style={styles.genderContainer}>

                        <TouchableOpacity
                            style={[styles.radioButton, petBody.gender === 'MALE' && styles.selected]}
                            onPress={() => setPetBody({ ...petBody, gender: 'MALE' })}
                        >
                            <Entypo name="man" size={20} color={petBody.gender === 'MALE' ? 'blue' : 'gray'} />
                            <Text style={styles.radioText}>MACHO</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.radioButton, petBody.gender === 'FEMALE' && styles.selected]}
                            onPress={() => setPetBody({ ...petBody, gender: 'FEMALE' })}
                        >
                            <FontAwesome5 name="female" size={20} color={petBody.gender === 'FEMALE' ? 'pink' : 'gray'} />
                            <Text style={styles.radioText}>FÊMEA</Text>
                        </TouchableOpacity>
                    </View>


                    <ThemedInput placeholder="Nome" value={petBody.name} onChangeText={name => setPetBody({ ...petBody, name: name })}>
                        <Entypo name="user" size={25} style={styles.icon} />
                    </ThemedInput>
                    {/* <ThemedInput placeholder="Genero" value={gender} onChangeText={setGender}>
                            <Entypo name="users" size={25} style={styles.icon} />
                        </ThemedInput> */}
                    {/* <ThemedInput placeholder="Aniversário" value={birthDate} onChangeText={setBirthDate}>
                            <Entypo name="calendar" size={25} style={styles.icon} />
                        </ThemedInput> */}
                    {/* Aniversário (Date Picker) */}

                    <ThemedInput placeholder="Espécie" value={petBody.specie} onChangeText={specie => setPetBody({ ...petBody, specie: specie })}>
                        <Entypo name="feather" size={25} style={styles.icon} />
                    </ThemedInput>
                    <ThemedInput placeholder="Raça" value={petBody.race} onChangeText={race => setPetBody({ ...petBody, race: race })}>
                        <Entypo name="v-card" size={25} style={styles.icon} />
                    </ThemedInput>


                    {loading ? (
                                            <ActivityIndicator size="small" color='blue' />
                                        ):(
                                            <ThemedButton type="blue" title="Cadastrar" onPress={Cadastrar} />
                                        )}

                </View>

            </View>
        </ThemedView>
    )
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
        margin: "auto",
        justifyContent: "center",
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
        paddingHorizontal: 10,
        marginHorizontal: 10,
    },
    logoContainer: {
        marginVertical: 10,
        alignItems: "center",
        justifyContent: 'center'
    },
    icon: {
        marginLeft: 10,
        marginRight: 10
    },
    genderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    text: {
        fontSize: 12,
        marginRight: 10,
        bottom: 0,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10, borderWidth: 1,
        borderRadius: 5,
        marginRight: 10
    },
    selected: {
        borderColor: 'blue',
        backgroundColor: '#E0F7FA'
    },
    radioText: {
        marginLeft: 5
    },
    dateInput: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10
    },
})