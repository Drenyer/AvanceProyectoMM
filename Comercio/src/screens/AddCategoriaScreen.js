// src/screens/AddCategoriaScreen.js
import React from 'react';
import { View } from 'react-native';
import AddCategoriaComponent from '../components/AddCategoriaComponent';
import styles from '../styles/AddCategoriaStyles';

const AddCategoriaScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AddCategoriaComponent navigation={navigation} />
    </View>
  );
};

export default AddCategoriaScreen;