import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import HomeCardList from '../../components/HomeCardList';

export default function Home() {
  
    return (
    <SafeAreaView style={styles.container}>
      <HomeCardList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});