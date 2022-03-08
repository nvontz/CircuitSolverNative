import * as React from 'react';
import { Text, View, Button, StyleSheet, Camera } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as tf from '@tensorflow/tfjs'
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

import { TestScreen, HomeScreen, CameraScreen, ModelScreen } from './Screens.js'


const Stack = createNativeStackNavigator();

class App extends React.Component {
  state = {
    isTfReady: false,
    model: false,
  }

  async componentDidMount() {
    await tf.ready()
    this.setState({ isTfReady: true })

    const modelJSON = require("./assets/model/model.json")
    const modelWeights = require("./assets/model/modelWeights.bin")
    const model = await tf.loadGraphModel(bundleResourceIO(modelJSON, modelWeights));

    this.setState({ model })
  }

  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CameraScreen" title="Camera" component={CameraScreen} />
          <Stack.Screen name="TestScreen" title="Test" component={TestScreen} />
          <Stack.Screen name="ModelScreen" title="Model" component={ModelScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default App
