import { StyleSheet, Text, TouchableOpacity, View, Image,Button } from 'react-native';
import react from 'react';
import styles from '../style';

const MainScreen= () => {
 return (
    <View style={styles.mainContainer}>
        <Image style={styles.mainLogo} source={require('../../../assets/logo.png')} />
    </View>
 );

}
export default MainScreen;