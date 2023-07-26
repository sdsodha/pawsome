import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import { auth } from '../../config/firebase';

const ProfileMenu = ({navigation}) => {

    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace('Login');
          })
          .catch((error) => alert(error.message));
      };

    return (
        <View style={styles.container}>

            <View style={styles.startActivityButtonContainer}>
                <TouchableOpacity style={styles.startActivityButton}
                    onPress={handleSignOut}>
                    <Text style={{ color: 'white' }}>Sign Out</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    startActivityButtonContainer: {
        marginVertical: 30,
        width: 320,
        borderRadius: 8,
        backgroundColor: '#37298A'
    },
    startActivityButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6A5ACD',
        fontSize: 18,
        width: 320,
        border: '#9c92da 1px',
        borderRadius: 8,
        padding: 10,
        marginBottom: 4,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 30,
    },

})

export default ProfileMenu;