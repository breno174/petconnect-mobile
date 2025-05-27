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

        if(!petImageName?.includes("supabase.co")){
            if (isMounted) setImageUrl('default')
            return
        }
      
        try {
            if (isMounted) {
                setImageUrl(petImageName);
            }
        } catch (err) {
            console.error('Error fetching image:', err);
            if (isMounted) {
                setError('Failed to load image');
                setImageUrl('default')
            }
        }
    };

    fetchImage();

    // Cleanup function to revoke the object URL and prevent memory leaks
    return () => {
        isMounted = false;
      };
    }, [petImageName]);
  
  return (
    <>
      {!(imageUrl === 'default') ? (
        <View>
          <Image
            source={imageUrl? { uri: imageUrl } : defaultIMG}
            style={styles.image}
            alt={petImageName || 'Default'}
            accessibilityLabel={petImageName || 'Default'}
            />
        </View>
      ) : (
        <View>
          <Image
            source={defaultIMG}
            style={styles.image}
            alt={petImageName || 'Default'}
            accessibilityLabel={petImageName || 'Default'}
            />
            <Text style={styles.errorText}>Falha ao carregar imagem.</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 200,
      borderTopStartRadius: 10,
      borderTopEndRadius: 10
    },
    placeholder: {
      width: '100%',
      height: 200,
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
      borderBottomWidth: 4,
      borderBottomColor: 'skyblue',
      backgroundColor: 'lightgray',
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      position: 'absolute',
      color: 'red',
      bottom: 0,
      padding: 1
    },
  });