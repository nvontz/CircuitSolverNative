import * as React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Camera,
  Image,
  SafeAreaView,
  Canvas,
} from "react-native";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
import GalleryComponent from "./GalleryComponent";
import CameraComponent from "./CameraComponent";
import { image, model } from "@tensorflow/tfjs";
import react, { useState, useEffect } from "react";

import {
  getModel,
  convertBase64ToTensor,
  startPrediction,
} from "./helpers/tensor-helper";
import { cropPicture } from "./helpers/image-helper";
//import { CardText } from "reactstrap";

function App() {
  const [model, SetModel] = useState();
  const [photo, GetImage] = useState();

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

  const predictionFunction = async () => {
    console.log("starting predicting");
    //Clear the canvas for each prediction
    /*
    var cnvs = document.getElementById("myCanvas");
    var ctx = cnvs.getContext("2d");
    ctx.clearRect(
      0,
      0,
      webcamRef.current.video.videoWidth,
      webcamRef.current.video.videoHeight
    );
    
    
    */
    const url =
      "https://automl.googleapis.com/v1beta1/projects/732021340214/locations/us-central1/models/IOD1837923845781061632:predict?key=AIzaSyAZaSJijgrI2aJwERA5BaoiwCCQuWu_6BY";

    const options = {
      method: "post",
      Authorization: {
        Bearer:
          "ya29.A0ARrdaM9y0BMq6wt9yYyAu6ETQ6yQ_BuPj53Awf1q50hZzgJkDfMCjsOIBiY2qLJq30iIxw81AVeqgcH7H6tLQxWp6oy1N34RO6ce4KjAFzoazjLhGGGNuQmtK203VMb06ahYwVfauJ2GUvbAsRI_HY1mugnNFC8",
      },
      payload: {
        image: {
          imageBytes: photo.base64,
        },
      },
    };

    fetch(url, options)
      .then((res) => res.text())
      .then((data) => console.log(data));
    //Start Prediction

    //const croppedData = await cropPicture(photo, 300);
    //const tensor = await convertBase64ToTensor(croppedData.base64);

    //const predicitions = await startPrediction(model, tensor);

    //console.log("tried to make prediction");

    // console.log(predicitions);
    /*
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
    } */
    //setTimeout(() => predictionFunction(), 500);
  };

  const checkUri = async () => {
    console.log(photo);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        title="Start Detection"
        onPress={() => {
          predictionFunction();
        }}
      />
      <Button
        title="Check Image Uri"
        onPress={() => {
          checkUri();
        }}
      />
      <CameraComponent GetImageUri={(photo) => GetImage(photo)} />
    </SafeAreaView>
  );
}
export default App;
