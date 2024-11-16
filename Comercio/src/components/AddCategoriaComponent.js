import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'; // Para manejar la imagen
import styles from '../styles/AddCategoriaStyles';

const AddCategoriaComponent = ({ navigation }) => {
  const [imagen, setImagen] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!imagen || !nombre.trim() || !descripcion.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
  
    console.log("Enviando datos:", { imagen, nombre, descripcion }); // Verifica los datos aquí
  
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('imagen', {
        uri: imagen,
        type: 'image/jpeg', 
        name: 'imagen.jpg', 
      });
      formData.append('nombre', nombre.trim());
      formData.append('descripcion', descripcion.trim());
      formData.append('fechaCreacion', new Date().toISOString());
  
      const response = await fetch('http://192.168.1.103:3000/addCategoria', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        Alert.alert(
          'Éxito',
          'Categoría creada correctamente',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack()
            }
          ]
        );
      } else {
        Alert.alert('Error', 'No se pudo crear la categoría');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      Alert.alert('Error', 'Hubo un problema al guardar la categoría');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Sección de imagen */}
        <TouchableOpacity 
          style={styles.imageContainer}
          onPress={pickImage}
        >
          {imagen ? (
            <Image
              source={{ uri: imagen }}
              style={styles.image}
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <MaterialIcons name="add-photo-alternate" size={40} color="#666" />
              <Text style={styles.placeholderText}>Añadir imagen</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Campos de texto */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre de la categoría</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Ej: Electrónicos"
              maxLength={50}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={descripcion}
              onChangeText={setDescripcion}
              placeholder="Describe la categoría..."
              multiline
              numberOfLines={4}
              maxLength={200}
            />
          </View>

          {/* Fecha (se mostrará al crear) */}
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              Fecha de creación: {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Botón de guardar */}
        <TouchableOpacity 
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Guardando...' : 'Guardar Categoría'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddCategoriaComponent;
