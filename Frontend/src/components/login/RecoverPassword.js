import { StyleSheet, KeyboardAvoidingView,Text,TextInput, TouchableOpacity, View, Image,Button } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import react from 'react';
import styles from '../style';
import { HeaderBackButton } from 'react-navigation-stack';

const RecoverPassword = () => { 

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <View style={styles.inputContainer}>
        <Image style={styles.logo} source={require('../../../assets/logo.png')} />
            <Text style={styles.heading}>Recover Your Password</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput
          placeholder="Email"
          value="Enter your email address"
          style={styles.input}
          onChangeText={text => setEmail(text)}
          
        />
        

        </View>

        <View style={styles.buttonContainer}>

        
        <TouchableOpacity
       
          style={styles.button}
        >
          <Text style={styles.buttonText}>Recover Password</Text>
        </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        
    );

};
export default RecoverPassword;

