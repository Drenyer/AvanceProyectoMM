// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import CategoriaScreen from '../screens/CategoriaScreen';
import AddCategoriaScreen from '../screens/AddCategoriaScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: 'Bienvenida' }}
        />
        <Stack.Screen
          name="Categoria"
          component={CategoriaScreen}
          options={{ title: 'Siguiente Pantalla' }}
        />
        <Stack.Screen
          name="AddCategoria"
          component={AddCategoriaScreen}
          options={{ title: 'Nueva Categoría' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;