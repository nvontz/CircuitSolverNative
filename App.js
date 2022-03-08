import * as React from 'react';
import { Text, View, Button, StyleSheet, Camera } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GalleryComponent from './GalleryComponent';
import CameraComponent from './CameraComponent';

import { TestScreen, HomeScreen, CameraScreen } from './Screens.js'


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CameraScreen" title="Camera" component={CameraScreen} />
        <Stack.Screen name="TestScreen" title="Test" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
