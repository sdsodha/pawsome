import { View, Text,StatusBar, KeyboardAvoidingView,TextInput, Button, Image,TouchableOpacity,Pressable, StyleSheet,SafeAreaView,ScrollView,FlatList, Dimensions, Alert } from 'react-native';

import react from 'react';
import styles from '../style';

const SetPassword = () => {

    return (
        <ScrollView>
            <Image  style={styles.logo} source={require('../../../assets/logo.png')} />
            <View style={styles.inputContainer}>
                <Text>Set New Password</Text>

                <Text style={styles.label}>New Password</Text>
        <TextInput
          placeholder="Password"
          value="password"
          
          style={styles.input}
          secureTextEntry
        />
 
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          placeholder="Password"
          value="password"
          
          style={styles.input}
          secureTextEntry
        />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    
                    style={styles.button}>
                        <Text style={styles.label}>Recover Password</Text>
                </TouchableOpacity>

               
            </View>



        </ScrollView>
    );

};
export default SetPassword;