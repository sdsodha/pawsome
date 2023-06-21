import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from 'native-base'

const PetSelectScreen = ({navigation}) => {
    return (
        <View>
            <Text>PetSelectScreen</Text>
            <Button onPress={() => navigation.navigate("Home")}>Continue</Button>
        </View>
    )
}

export default PetSelectScreen

const styles = StyleSheet.create({})