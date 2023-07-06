import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, Alert,Image,TouchableOpacity, View } from 'react-native'
import { auth } from '../../config/firebase'
import styles from '../style'
// import TwoTabsComponent from '../homescreens/leaderboard'

const LoginScreen = () => {
  const [email, setEmail] = useState('amberslim@gmail.com')
  const [password, setPassword] = useState('123456')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("PetSelect")
      }
    })

    return unsubscribe
  }, [])

  // const handleSignUp = () => {
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(userCredentials => {
  //       const user = userCredentials.user;
  //       console.log('Registered with:', user.email);
  //     })
  //     .catch(error => alert(error.message))
  // }

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
  
        // Save user data to MongoDB
        await saveUserDataToMongoDB(user.email, user.uid);
        console.log('User data saved to MongoDB');
      })
      .catch((error) => alert(error.message));
  };
  
  const saveUserDataToMongoDB = async (email, uid) => {
    try {
      // Make HTTP POST request to your API endpoint
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          email,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save user data to MongoDB');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    // <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior="padding"
    // >
    //   <View style={styles.inputContainer}>
    //     <TextInput
    //       placeholder="Email"
    //       value={email}
    //       onChangeText={text => setEmail(text)}
    //       style={styles.input}
    //     />
    //     <TextInput
    //       placeholder="Password"
    //       value={password}
    //       onChangeText={text => setPassword(text)}
    //       style={styles.input}
    //       secureTextEntry
    //     />
    //   </View>

    //   <View style={styles.buttonContainer}>
    //     <TouchableOpacity
    //       onPress={handleLogin}
    //       style={styles.button}
    //     >
    //       <Text style={styles.buttonText}>Login</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       onPress={handleSignUp}
    //       style={[styles.button, styles.buttonOutline]}
    //     >
    //       <Text style={styles.buttonOutlineText}>Register</Text>
    //     </TouchableOpacity>
    //   </View>
    // </KeyboardAvoidingView>

    <KeyboardAvoidingView>
      
      <Image  style={styles.logo} source={require('../../../assets/logo.png')} />
    
      <View style={styles.inputContainer}>

      
      <Text>Welcome</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text>E-mail</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity
         onPress={() => navigation.navigate("ForgotPassword")} >
       
          <Text>Forgot Your Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text>Or</Text>
        <TouchableOpacity
      
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login With Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
         // onPress={handleSignUp}
         onPress={() => navigation.navigate("CreateAccount")} >
          
        
          <Text>New to Pawsome? Sign Up!</Text>
        </TouchableOpacity>
      </View>

      
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})*/