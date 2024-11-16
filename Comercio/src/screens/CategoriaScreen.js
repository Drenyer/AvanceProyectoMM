// src/screens/CategoriaComponent.js
import React from 'react';
import { View } from 'react-native';
import CategoriaComponent from '../components/CategoriaComponent';
import styles from '../styles/WelcomeStyles';

const CategoriaScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CategoriaComponent navigation={navigation}/>
    </View>
  );
};

export default CategoriaScreen;