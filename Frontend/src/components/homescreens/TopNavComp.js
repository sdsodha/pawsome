import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const TopNavComp = ({navigation}) => {

    return (
        <View style={styles.buttonContainer}>

            <View style={styles.buttonView}>
                <TouchableOpacity
                    onPress={() => {navigation.navigate('ProfileMenuScreen');}}
                >
                    <Image
                        style={styles.button}
                        resizeMode='contain'
                        source={require("../../../assets/activityIcons/profile.png")}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonView}>
                <TouchableOpacity
                    onPress={() => { }}
                >
                    <Image
                        style={styles.button}
                        resizeMode='contain'
                        source={require("../../../assets/activityIcons/notification.png")}
                    />
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 250,
        height: 'auto',
        width: '100%',
        backgroundColor: 'white',
        marginTop: 60,
        paddingHorizontal: 30,
    },
    button: {
        width: 40,
        height: 40,
    },
})

export default TopNavComp;