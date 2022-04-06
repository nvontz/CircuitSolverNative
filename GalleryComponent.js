import React, { useState, useEffect } from "react";

import * as ImagePicker from "expo-image-picker";
import { Button, Image, View, Platform, StyleSheet } from "react-native";

function GalleryComponent(props) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Sorry, Camera roll permissions are required to make this work!"
          );
        }
      }
    })();
  }, []);

  const chooseImg = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: false,
      });

      if (!result.cancelled) {
        setImage(result.uri);
        props.GetImageUri(result.uri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*{image && <Image source={{ uri: image }} style={{ width: 354, height: 200 }} />} */
  return (
    <View style={styles.bottom}>
      <Button title="Choose image from camera roll" onPress={chooseImg} />
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    bottom: 0,
  },
});

export default GalleryComponent;
