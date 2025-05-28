import React, { useEffect, useState } from 'react';
// import { getPetImage } from '../api/get-pet-image';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

interface PetImageProps {
  petImageName: string | null;
  petEdit: boolean
}

export const PetImage: React.FC<PetImageProps> = ({ petImageName, petEdit = false }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const defaultIMG = require('../../assets/images/download.jpeg')
  const editIMG = require('../../assets/images/connectAdd.png')

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {

      if (!petImageName?.includes("supabase.co")) {
        if (isMounted) {
          setImageUrl(petEdit ? 'edit' : 'default');
          setIsLoading(false);
        }
        return;
      }

      try {
        if (isMounted) {
          setImageUrl(petImageName);
        }
      } catch (err) {
        console.error('Error fetching image:', err);
        if (isMounted) {
          setImageUrl('default')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchImage();

    // Cleanup function to revoke the object URL and prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, [petImageName]);

  if (isLoading) {
    return (
      <View style={styles.placeholder}>
        <ActivityIndicator size="large" color="skyblue" />
      </View>
    );
  }

  return (
    <>
      {!(imageUrl === 'default') ? (
        <View>
          <Image
            source={imageUrl ? { uri: imageUrl } : defaultIMG}
            style={styles.image}
            alt={petImageName || 'Default'}
            accessibilityLabel={petImageName || 'Default'}
          />
        </View>
      ) : (
        <View>
          <Image
            source={petEdit ? editIMG : defaultIMG}
            style={styles.image}
            alt={petImageName || 'Default'}
            accessibilityLabel={petImageName || 'Default'}
          />
          {petEdit ? (
            <Text style={styles.editText}>Toque para modificar a imagem do seu Pet!</Text>
          )
            : (
              <Text style={styles.errorText}>Falha ao carregar imagem.</Text>
            )
          }
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
    borderTopEndRadius: 10,
    borderBottomWidth: 4,
    borderBottomColor: 'skyblue',
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
  editText: {
    position: 'absolute',
    bottom: 0,
    paddingTop: 10
  },
});