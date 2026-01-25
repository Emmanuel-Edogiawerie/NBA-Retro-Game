import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeamSelectionScreen from '../screens/TeamSelectionScreen';
import GameScreen from '../screens/GameScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
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

