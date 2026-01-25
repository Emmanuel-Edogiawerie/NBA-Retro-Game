// src/navigation/AppNavigator.js
// Configura la navegación tipo Stack entre las pantallas principales.

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeamSelectionScreen from '../screens/TeamSelectionScreen';
import GameScreen from '../screens/GameScreen';

// Creamos el Stack Navigator de React Navigation
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    // Definimos las pantallas del stack
    <Stack.Navigator
      initialRouteName="TeamSelection"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="TeamSelection"
        component={TeamSelectionScreen}
      />
      <Stack.Screen
        name="Game"
        component={GameScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

