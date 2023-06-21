import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base'
import AppStack from './src/components/stacks/AppStack';



export default function App() {
  return (
    <NativeBaseProvider>
      <AppStack />
      <StatusBar style='auto' />
    </NativeBaseProvider>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //     <Stack.Screen name="PetForm" component={PetForm} />
    //     <Stack.Screen name="PetComponent" component={PetComponent} />
    //     <Stack.Screen name="UserListComponent" component={UserListComponent} />
    //   </Stack.Navigator>
    // </NavigationContainer>
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