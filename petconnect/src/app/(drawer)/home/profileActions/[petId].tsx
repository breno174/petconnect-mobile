import { ThemedView } from "@/src/components/ThemedView";
import { ThemedInput } from "@/src/components/ThemedInput";
import { ThemedButton } from "@/src/components/ThemedButton";
import { ThemedText } from "@/src/components/ThemedText";
import { Image, View, StyleSheet, Alert, Platform, TouchableOpacity, Text, TextInput, ActivityIndicator } from "react-native";
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
import { usePetContext } from "@/src/context/petContext";



export default function Register() {
    const router = useRouter()
    const { selectedPet } = usePetContext();
    const [petBody, setPetBody] = useState<PetBody>({
        name: '',
        gender: 'MALE',
        birthDate: new Date(),
        specie: '',
        race: ''
    });
    const [image, setImage] = useState<string | null>(null);
    const [initialImage, setInitialImage] = useState<string | null>(null);
    const [error, setError] = useState('');
    // const { petId } = useLocalSearchParams();
    // const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const fetchPetData = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:8080/pet/${petId}`);
    //             const data = await response.json();
    //             console.log({ data: data });

    //             setPet(data);
    //         } catch (error) {
    //             console.error("Erro ao buscar dados do pet:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (petId) {
    //         fetchPetData();
    //     }
    // }, [petId]);

    useEffect(() => {
        if (selectedPet) {
            setImage(selectedPet.image)
            setInitialImage(selectedPet.image)
            const tempBirthDate = new Date(selectedPet.birthDate);
            setPetBody({
                name: selectedPet.name,
                gender: selectedPet.gender,
                birthDate: tempBirthDate,
                specie: selectedPet.specie,
                race: selectedPet.race,
            });
        }
    }, [selectedPet]);


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
            if (!image) {
                if (Platform.OS === "web") {
                    window.alert("Necessário uma foto para cadastrar o Pet.");
                } else {
                    Alert.alert("Necessário uma foto para cadastrar o Pet.");
                }
                return;
            }

            setLoading(true)
            const response = await editPet(petBody, selectedPet!.id.toString())

            console.log('response', response.data);

            if (!(image === initialImage)) {
                const formData = new FormData();
                const responseImage = await fetch(image);
                const blob = await responseImage.blob()
                const petId = response.data.id
    
                formData.append("file", blob, `pet-${petId}.jpg`);
    
                await uploadPetImage(formData, petId).catch(error => console.log(error))
            }
            // const file = {
            //     uri: image,
            //     name: `pet-${response.data.id}.jpg`, // Use a meaningful name
            //     type: blob.type || 'image/jpeg', // Fallback to JPEG if type is unknown
            // };

            setLoading(false)
            router.replace({ pathname: "/(drawer)/home/userdata", params: { refreshKey: Date.now().toString() } });

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

                    {loading ? (
                        <ActivityIndicator size="small" color='blue' />
                    ):(
                        <ThemedButton type="blue" title="Atualizar" onPress={Update} />
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
    logoContainer: {
        marginVertical: 10,
        alignItems: "center",
        justifyContent: 'center'
    },
    text: {
        fontSize: 12,
        marginRight: 10,
        bottom: 0,
        fontWeight: 'bold',
        textAlign: 'center',
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