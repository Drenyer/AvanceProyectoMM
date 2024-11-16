import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/CategoriaStyles';

const CategoriaComponent = ({ navigation }) => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://192.168.1.103:3000/categorias');
      if (!response.ok) {
        throw new Error('Error al obtener las categorías');
      }
      const data = await response.json();
      setCategorias(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching categorias:', err);
      setError('No se pudieron cargar las categorías');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();

    // Add listener for when the screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCategorias();
    });

    return unsubscribe;
  }, [navigation]);

  const renderCategoria = ({ item }) => (
    <TouchableOpacity
      style={styles.categoriaContainer}
      onPress={() => handleCategoriaPress(item)}
    >
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handleImagePress(item)}
      >
        {item.imagen ? (
          <Image
            source={{ uri: item.imagen }}
            style={styles.categoriaImagen}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <MaterialIcons name="image" size={40} color="#666" />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.categoriaInfo}>
        <Text style={styles.categoriaNombre}>{item.nombre}</Text>
        <Text style={styles.categoriaDescripcion}>{item.descripcion}</Text>
        <Text style={styles.categoriaFecha}>
          Creado: {new Date(item.fechaCreacion).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handleCategoriaPress = (categoria) => {
    console.log('Categoria seleccionada:', categoria);
  };

  const handleImagePress = (categoria) => {
    console.log('Actualizar imagen de:', categoria.nombre);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchCategorias}
        >
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categorias}
        renderItem={renderCategoria}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay categorías disponibles</Text>
          </View>
        }
      />
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCategoria')}
        activeOpacity={0.7}
      >
        <MaterialIcons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default CategoriaComponent;