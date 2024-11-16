// src/components/WelcomeMessage.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/WelcomeStyles';

const WelcomeMessage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>¡Bienvenido a mi aplicación!</Text>
        <Text style={styles.subText}>Gracias por usar nuestra app</Text>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Categoria')}
      >
        <Text style={styles.buttonText}>Ir a la siguiente pantalla</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeMessage;
