import { ThemedView } from "@/src/components/ThemedView";
import { ThemedInput } from "@/src/components/ThemedInput";
import { ThemedButton } from "@/src/components/ThemedButton";
import { ThemedText } from "@/src/components/ThemedText";
import { Image, View, StyleSheet, Alert, Platform, TouchableOpacity, Text, TextInput } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import * as ImagePicker from 'expo-image-picker';
import { PetBody } from "@/src/interfaces/petBodyInterface";
import { uploadPetImage } from "@/src/api/upload-pet-image";
import { Pet } from "@/src/interfaces/petInterface";
import { editPet } from "@/src/api/edit-pet";



export default function Register() {
    const router = useRouter()
    const [petBody, setPetBody] = useState<PetBody>({
        name: '',
        gender: 'MALE',
        birthDate: new Date(),
        specie: '',
        race: ''
    });
    const [image, setImage] = useState<string | null>(null);
    const [uploadUrl, setUploadUrl] = useState('');
    const [error, setError] = useState('');
    const { petId } = useLocalSearchParams();
    const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/pet/${petId}`);
                const data = await response.json();
                console.log({ data: data });

                setPet(data);
            } catch (error) {
                console.error("Erro ao buscar dados do pet:", error);
            } finally {
                setLoading(false);
            }
        };

        if (petId) {
            fetchPetData();
        }
    }, [petId]);

    useEffect(() => {
        if (pet) {
          const tempBirthDate = new Date(pet.birthDate);
          setPetBody({
            name: pet.name,
            gender: pet.gender,
            birthDate: tempBirthDate,
            specie: pet.specie,
            race: pet.race,
          });
        }
       }, [pet]);


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

    async function Update() {

        try {
            const response = await editPet(petBody, pet!.id.toString())

            console.log('response', response.data);

            if (!image) return;

            const formData = new FormData();
            formData.append("image", image);

            await uploadPetImage(formData, response.data.id).catch(error => console.log(error))



            router.replace("/(drawer)/homeScreen");

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


    }

    return (
        <ThemedView style={styles.container}>
            <View>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={
                            image
                                ? { uri: image }
                                : require("@/assets/images/connect.png")
                        }
                        style={styles.logo}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <ThemedText
                    type="title"
                    style={styles.titleContainer}
                >Cadastro PET
                </ThemedText>

                <View style={styles.container}>
                    <input
                        type="date"
                        value={petBody.birthDate.toISOString().slice(0, 10)}
                        onChange={(e) => {
                            const newDate = new Date(e.target.value);
                            setPetBody({ ...petBody, birthDate: newDate });
                        }}
                        style={{ borderWidth: 1, padding: 8, borderRadius: 5 }}
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

                    <ThemedInput placeholder="Especie" value={petBody.specie} onChangeText={specie => setPetBody({ ...petBody, specie: specie })}>
                        <Entypo name="feather" size={25} style={styles.icon} />
                    </ThemedInput>
                    
                    <ThemedInput placeholder="Raça" value={petBody.race} onChangeText={race => setPetBody({ ...petBody, race: race })}>
                        <Entypo name="v-card" size={25} style={styles.icon} />
                    </ThemedInput>


                    <ThemedButton type="blue" title="Atualizar" onPress={Update} />

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
        margin: 10,
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
    label: {
        fontSize: 16,
        marginRight: 10
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