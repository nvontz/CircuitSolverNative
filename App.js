import * as React from 'react';
import { Text, View, Button, StyleSheet, Camera, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as tf from '@tensorflow/tfjs'
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';

import { TestScreen, HomeScreen, CameraScreen, ModelScreen } from './Screens.js'


const Stack = createNativeStackNavigator();

class App extends React.Component {
  state = {
    isTfReady: false,
    model: false,
    prediction: null
  }

  async componentDidMount() {
    await tf.ready()
    this.setState({ isTfReady: true })

    const modelJSON = require("./assets/model/model.json")
    const modelWeights = require("./assets/model/modelWeights.bin")
    const model = await tf.loadGraphModel(bundleResourceIO(modelJSON, modelWeights));

    //const testingImage = "./assets/img/R1.jpg"
    //const imageAssetPath = Image.resolveAssetSource(testingImage)
    const uri = 'http://www.clipartbest.com/cliparts/ace/og5/aceog5bni.jpeg'

    const response = await fetch(uri, {}, { isBinary: true })
    const imageData = await response.arrayBuffer()
    const imageTensor = decodeJpeg(imageData)

    const prediction = (await model.predict(imageTensor))[0]
    console.log(prediction)

    this.setState({ model, prediction })
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
