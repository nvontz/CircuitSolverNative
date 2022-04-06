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
//import { CardText } from "reactstrap";

function App() {
  const [model, SetModel] = useState();
  const [prediction, UpdatePrediction] = useState(null);
  const [image, GetImage] = useState(null);

  //function that verifies the model has been loaded and that tf is ready
  async function loadModel() {
    try {
      const modelJSON = require("./assets/model/model.json");
      const modelWeights = require("./assets/model/modelWeights.bin");

      const model = await tf.loadGraphModel(
        bundleResourceIO(modelJSON, modelWeights)
      );
      SetModel(model);
      console.log("set loaded Model");
    } catch (err) {
      console.log(err);
      console.log("failed load model");
    }
  }
  useEffect(() => {
    tf.ready().then(() => {
      loadModel();
    });
  }, []);

  //old useEffect()
  /*
  useEffect(() => {
    (async () => {

      const testingImage = "./assets/img/R1.jpg";
      const imageAssetPath = Image.resolveAssetSource(testingImage);
      const uri = "http://www.clipartbest.com/cliparts/ace/og5/aceog5bni.jpeg";

      const response = await fetch(uri, {}, { isBinary: true });
      const imageData = await response.arrayBuffer();
      const imageTensor = decodeJpeg(imageData);

      UpdatePrediction(await model.predict(imageTensor))[0];
      //console.log(prediction);

      this.setState({ model, prediction });

      //console.log(model);
    })();
  }, []);
*/

  async function predictionFunction() {
    //Claer the canvas for each prediction
    var cnvs = document.getElementById("myCanvas");
    var ctx = cnvs.getContext("2d");
    ctx.clearRect(
      0,
      0,
      webcamRef.current.video.videoWidth,
      webcamRef.current.video.videoHeight
    );

    //Start Prediction
    const predicitions = await model.detect(document.getElementById(image));

    if (predicitions.length > 0) {
      console.log(predicitions);

      for (let n = 0; n < predicitions.length; n++) {
        console.log(n);
        if (predicitions[n].score > 0.5) {
          let bboxLeft = predictions[n].bbox[0];
          let bboxTop = predictions[n].bbox[1];
          let bboxWidth = predictions[n].bbox[2];
          let bboxHeight = predictions[n].bbox[3] - bboxTop;
          console.log("bboxLeft: " + bboxLeft);
          console.log("bboxTop: " + bboxTop);
          console.log("bboxWidth: " + bboxWidth);
          console.log("bboxHeight: " + bboxHeight);

          //Drawing Boxes
          ctx.beginPath();
          ctx.font = "28px Arial";
          ctx.fillStyle = "red";
          cit.fillText(
            predicitions[n].class +
              ": " +
              Math.round(parseFloat(predicitions[n].score) * 100) +
              "%",
            bboxLeft,
            bboxTop
          );

          ctx.react(bboxLeft, bboxTop, bboxWidth, bboxHeight);
          ctx.strokeStyle = "#FF0000";
          ctx.linewidth = 3;
          ctx.stroke();

          console.log("detected");
        }
      }
    }
    setTimeout(() => predictionFunction(), 500);
  }

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <CameraComponent GetImageUri={(image) => GetImage(image)} />
      <GalleryComponent GetImageUri={(image) => GetImage(image)} />
      <Button
        title="Start Detection"
        onClick={() => {
          predictionFunction();
        }}
      />
    </SafeAreaView>
  );
}
export default App;
