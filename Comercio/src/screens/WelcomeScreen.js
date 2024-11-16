// src/screens/WelcomeScreen.js
import React from 'react';
import { View } from 'react-native';
import WelcomeMessage from '../components/WelcomeMessage';
import styles from '../styles/WelcomeStyles';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <WelcomeMessage navigation={navigation} />
    </View>
  );
};

export default WelcomeScreen;