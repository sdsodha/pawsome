import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PetComponent from '../homescreens/petscreen';
import ActivitySelection from '../activityscreens/ActivitySelection';
import ActivityProgress from '../activityscreens/ActivityProgress';

const Stack = createNativeStackNavigator();

const PetActivityStack = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="PetHomeScreen" component={PetComponent} options={{ headerShown: false }} initialParams={{ food: 0, water:0, treat:0 }}/>
                <Stack.Screen name="ActivitySelectionScreen" component={ActivitySelection} />
                <Stack.Screen name="ActivityProgressScreen" component={ActivityProgress} />
            </Stack.Navigator>
        

    )
}

export default PetActivityStack