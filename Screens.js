
import * as React from 'react';
import { Text, View, Button, StyleSheet, Camera } from 'react-native';
import GalleryComponent from './GalleryComponent';
import CameraComponent from './CameraComponent';

function ModelScreen({ navigation, image }){
    return (
        <View>
            <Text>HI Douglas :D</Text>
        </View>
    )
}

function TestScreen({ navigation }) {
    return (
        <View style={styles.row}>
            <Text>Hello World :D</Text>
            <Button
                style={styles.row}
                onPress={() => navigation.goBack()}
                title="Go Back" />
            <Button style={styles.row} onPress={() => navigation.navigate('CameraScreen')} title="Go to Camera" />
        </View>
    )
}

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Text>Welcome to the Circuit Solver</Text>
            <Button
                title="Go to Camera"
                onPress={() => {
                    navigation.navigate('CameraScreen')
                }}
            />
            <Button title="Go to test" onPress={() => { navigation.navigate('TestScreen') }} />
            <Button title="Go to model page" onPress={() => {navigation.navigate('ModelScreen')}}/>
        </View>
    );
}

function CameraScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <CameraComponent />
            <GalleryComponent />
            <Text>Use Camera to take pictures of your circuit, or upload your own</Text>
            <Button style={styles.bottom} title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button style={styles.bottom} title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    row: {
        justifyContent: 'flex-end',
        flexDirection: 'row'
    }
})

export {HomeScreen, TestScreen, CameraScreen, ModelScreen}