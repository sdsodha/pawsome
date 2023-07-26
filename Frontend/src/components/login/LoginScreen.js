import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, Alert, Image, TouchableOpacity, View } from 'react-native'
import { auth } from '../../config/firebase'
//import styles from '../style'
// import TwoTabsComponent from '../homescreens/leaderboard'

const LoginScreen = () => {
  const [email, setEmail] = useState('amber@gmail.com')
  const [password, setPassword] = useState('123456')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        if (user.email === "amber@gmail.com") {
          console.log('Go to Left Pet Comp');
          navigation.navigate("Home", { selectedPet: 0, petName: "LEFT" });
        } else {
          navigation.navigate("PetSelect");
        }
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

    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={50}
      style={{
        backgroundColor: 'white',
        height: '100%',
      }}>

      <View style={{
        marginHorizontal: 30,
      }}>

        <Image style={{
          width: '30%',
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: 50,
          marginBottom: 0,
        }} source={require('../../../assets/logo.png')} />

        <View>
          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
          }}>Welcome</Text>
        </View>

        <View style={{
          width: '90%',
          marginTop: 40,
        }}>

          <Text style={{
            fontWeight: "bold"
          }}>Email</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={{
              backgroundColor: '#D9D9D9', width: 330, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, marginTop: 5,
            }}
          />


          <Text style={{
            fontWeight: "bold",
            marginTop: 10,
          }}>Password</Text>

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={{
              backgroundColor: '#D9D9D9', width: 330, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, marginTop: 5,
            }}
            secureTextEntry
          />

          <TouchableOpacity
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: 20,
              width: 330,
            }}
            onPress={() => navigation.navigate("ForgotPassword")} >
            <Text>Forgot Your Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.loginButton}
          >
            <Text style={{ color: 'white' }}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.textcontainer}>
          <Text style={styles.signtext}>Or</Text>
        </View>

        <View style={styles.googleButtonContainer}>
          <TouchableOpacity

            style={styles.googleButton}
          >
            <Image style={styles.google} source={require('../../../assets/google.jpeg')} />
            <Text style={styles.buttonText}>Sign in With Google</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          // onPress={handleSignUp}
          onPress={() => navigation.navigate("CreateAccount")} >

          <View style={{
            justifyContent: 'center',
            textAlign: 'center',
            flexDirection: 'row',
          }}>
            <Text>New to Pawsome?</Text><Text style={{ fontWeight: 'bold' }}> Sign Up!</Text>
          </View>

        </TouchableOpacity>


      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  loginButton: {
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: '#6A5ACD',
    fontSize: 20,
    width: '100%',
    border: '#9c92da 1px',
    borderRadius: 8,
    padding: 10,
  },
  loginButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    marginTop: 20,
    marginLeft: 0,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#37298A',
    marginBottom: 20,
  },
  registerButton: {
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: '#6A5ACD',
    fontSize: 20,
    width: 100,
    border: '#9c92da 1px',
    borderRadius: 8,
    padding: 10,
  },
  registerButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    marginTop: 35,
    marginLeft: 10,
    width: 100,
    borderRadius: 8,
    backgroundColor: '#37298A'
  },
  googleButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    marginTop: 20,
    marginLeft: 0,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#37298A',
    marginBottom: 20,
  },
  googleButton: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: 'white',
    fontSize: 20,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6A5ACD',
    padding: 10,
  },
  recoverButton: {
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: '#6A5ACD',
    fontSize: 20,
    width: 200,
    border: '#9c92da 1px',
    borderRadius: 8,
    padding: 10,
  },
  recoverButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    marginTop: 35,
    marginLeft: 40,
    width: 200,
    borderRadius: 8,
    backgroundColor: '#37298A'
  },
  signtext: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  google: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

})