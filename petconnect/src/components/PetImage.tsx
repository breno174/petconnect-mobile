import React, { useEffect, useState } from 'react';
import { getPetImage } from '../api/get-pet-image';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

interface PetImageProps {
  petImageName: string | null;
}

export const PetImage: React.FC<PetImageProps> = ({ petImageName }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const defaultIMG = require('../../assets/images/download.jpeg')

  useEffect(() => {
    let isMounted = true; // To avoid setting state on unmounted component

    const fetchImage = async () => {

        if(!petImageName){
            setImageUrl(defaultIMG)
            return
        }
      
        try {
            const url = await getPetImage(petImageName)

            if (isMounted) {
                setImageUrl(url);
            }
        } catch (err) {
            console.error('Error fetching image:', err);
            if (isMounted) {
                setError('Failed to load image');
                setImageUrl(defaultIMG)
            }
        }
    };

    fetchImage();

    // Cleanup function to revoke the object URL and prevent memory leaks
    return () => {
        isMounted = false;
      };
    }, [petImageName]);
  
    if (error) {
      return (
        <View style={styles.placeholder}>
          <Image source={defaultIMG} style={styles.image} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

  return (
    <>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          alt={petImageName || "Default"}
          accessibilityLabel={petImageName || "Default"}
        />
      ) : (
        <View style={styles.placeholder}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 200,
      borderBottomWidth: 4,
      borderBottomColor: 'skyblue',
    },
    placeholder: {
      width: '100%',
      height: 200,
      borderBottomWidth: 4,
      borderBottomColor: 'skyblue',
      backgroundColor: 'lightgray',
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      color: 'red',
      marginTop: 10,
    },
  });