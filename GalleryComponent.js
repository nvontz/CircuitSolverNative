import React, { useState, useEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { Button, Image, View, Platform } from 'react-native';



export default function GalleryComponent() {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, Camera roll permissions are required to make this work!');
                }
            }
        })();
    }, []);

    const chooseImg = async () => {
        try{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
            quality: 1,
            allowsEditing: false,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }}
        catch(err)
        {
            console.log(err)
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Button title="Choose image from camera roll" onPress={chooseImg} />
                {image && <Image source={{ uri: image }} style={{ width: 354, height: 200 }} />}
        </View>
    );
}