import { Camera } from "expo-camera";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";

function CameraComponent(GetImageUri) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
      GetImageUri(data.uri);
      /* at this point, the image could be passed to the Image Recognition program */
    }
  };
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (image) {
    return (
      <View style={{ flex: 1 }}>
        {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
      </View>
    );
  }
  return (
    <View>
      <Camera
        style={styles.fixedRatio}
        ref={(ref) => setCamera(ref)}
        type={type}
      />
      <Button
        title="Flip Camera"
        style={styles.bottomCamera}
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />
      <Button
        title="Take Picture"
        style={styles.bottomCamera}
        onPress={() => takePicture()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 7,
    justifyContent: "center",
  },
  bottomCamera: {
    bottom: 0,
    justifyContent: "center",
    flex: 1,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});

export default CameraComponent;
