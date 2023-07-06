import {  Text, Modal,  Alert,Pressable, TextInput,TouchableOpacity,KeyboardAvoidingView,ScrollView, View, Image,Button } from 'react-native';
import {react,useState} from 'react';
import styles from '../style';

const CreateAccount = () => {

    const [modalVisible, setModalVisible] = useState(false);
    
return (
    <ScrollView>
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <View style={styles.buttonContainer}>
            <Image style={styles.logo} source={require('../../../assets/logo.png')} />
            <Text style={styles.heading}>Create Account</Text>
    </View>
    <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
            placeholder="name"
            value="Enter your Name"
            style={styles.input}
            onChangeText={text => setEmail(text)}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
            placeholder="Email"
            value="Enter your email address"
            style={styles.input}
            onChangeText={text => setEmail(text)}
            
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
            placeholder="Password"
            value="Password"
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
            />
            <Text style={styles.label}>Re-Enter Password</Text>
            <TextInput
            placeholder="Cpassword"
            value="Password"
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
            />
    </View>

    <View style={styles.buttonContainer}>
       
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        
        <Text>Or</Text>
        
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login With Google</Text>
        </TouchableOpacity>
        
    </View>
    {/* <View>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
      </View> */}
    </KeyboardAvoidingView>
    </ScrollView>
);

};

export default CreateAccount;