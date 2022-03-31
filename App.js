import * as React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Camera,
  Image,
  SafeAreaView,
} from "react-native";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
import GalleryComponent from "./GalleryComponent";
import CameraComponent from "./CameraComponent";
import { image, model } from "@tensorflow/tfjs";
import react, { useState, useEffect } from "react";

function App() {
  const [isTfReady, CheckIsTfReady] = useState(false);
  const [model, CheckModel] = useState(false);
  const [prediction, CheckPrediction] = useState(null);
  const [image, GetImage] = useState(null);

  useEffect(() => {
    (async () => {
      CheckIsTfReady(true);

      const modelJSON = require("./assets/model/model.json");
      const modelWeights = require("./assets/model/modelWeights.bin");
      const model = await tf.loadGraphModel(
        bundleResourceIO(modelJSON, modelWeights)
      );

      //const testingImage = "./assets/img/R1.jpg"
      //const imageAssetPath = Image.resolveAssetSource(testingImage)
      const uri = "http://www.clipartbest.com/cliparts/ace/og5/aceog5bni.jpeg";

      const response = await fetch(uri, {}, { isBinary: true });
      const imageData = await response.arrayBuffer();
      const imageTensor = decodeJpeg(imageData);

      const prediction = (await model.predict(imageTensor))[0];
      console.log(prediction);

      this.setState({ model, prediction });
    })();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <CameraComponent GetImageUri={(image) => GetImage(image)} />
      <GalleryComponent GetImageUri={(image) => GetImage(image)} />
    </SafeAreaView>
  );
}
export default App;
