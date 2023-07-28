import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import { auth } from '../../config/firebase';

const ProfileMenu = ({ navigation }) => {

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

            <View>
                <View style={styles.listButton}>
                    <View style={styles.listButtonContentContainer}>
                        <Text style={{width: 100}}>Personal</Text>
                        <Text>></Text>
                    </View>
                </View>
                <View style={styles.listButton}>
                    <View style={styles.listButtonContentContainer}>
                        <Text style={{width: 100}}>Pet</Text>
                        <Text>></Text>
                    </View>
                </View>
                <View style={styles.listButton}>
                    <View style={styles.listButtonContentContainer}>
                        <Text style={{width: 100}}>Privacy</Text>
                        <Text>></Text>
                    </View>
                </View>
                <View style={styles.listButton}>
                    <View style={styles.listButtonContentContainer}>
                        <Text style={{width: 100}}>Notification</Text>
                        <Text>></Text>
                    </View>
                </View>
                <View style={styles.listButton}>
                    <View style={styles.listButtonContentContainer}>
                        <Text style={{width: 100}}>Delete Account</Text>
                        <Text>></Text>
                    </View>
                </View>
            </View>

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
    listButton: {
        backgroundColor: "#CEC9EE",
        width: 330,
        height: 60,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    listButtonContentContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 150,
        width: 300,
        padding: 20,
    },
    startActivityButtonContainer: {
        marginVertical: 30,
        width: 330,
        borderRadius: 8,
        backgroundColor: '#37298A'
    },
    startActivityButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6A5ACD',
        fontSize: 18,
        width: 330,
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
        gap: 180,
        paddingTop: 60,
    },

})

export default ProfileMenu;