import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from './screens/LoginScreen1';
// import HomeScreen from './screens/homescreen1';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/homescreen1';
import PetForm from './screens/petform';
import PetComponent from './screens/petscreen';
import UserListComponent from './screens/userlist';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PetForm" component={PetForm} />
        <Stack.Screen name="PetComponent" component={PetComponent} />
        <Stack.Screen name="UserListComponent" component={UserListComponent} />
      </Stack.Navigator>
    </NavigationContainer>
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