import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base'
import AppStack from './src/components/stacks/AppStack';
import {useCallback,useEffect,useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';

//SplashScreen.preventAutoHideAsync();
export default function App() {
  /*const [appIsReady,setAppIsReady] = useState(false);
  useEffect( () => {
    async function show_splash_screen(){
    try{
        // our api calls will be here.
        new Promise(resolve => setTimeout(resolve,5000)); // wait for 5 secs
    }catch(e){
        console.warn(e);
    }finally{
        setAppIsReady(true); // application to render.
    }
    }
    show_splash_screen();
});*/
/*
const onLayoutRootView = useCallback(async () => {
  if(appIsReady){
  // hide the splash screen.
  await SplashScreen.hideAsync();
  }
},[appIsReady]);
*/
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