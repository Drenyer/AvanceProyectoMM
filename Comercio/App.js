// App.js (en la raíz del proyecto, NO en src/)
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator'; // Si App.js está en la raíz

const App = () => {
  return <AppNavigator />;
};

export default App;