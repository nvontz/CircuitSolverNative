import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  
  console.log("App Executed");

  return (
    <View style={styles.container}>
      <Text>Circuit Solver</Text>
      <Button onPress={() => alert("Hello Dr. Gruenbacher!")} 
      title='Test Server'/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
