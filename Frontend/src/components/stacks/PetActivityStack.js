import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PetComponent from '../homescreens/petscreen';
import ActivitySelection from '../activityscreens/ActivitySelection';
import ActivityProgress from '../activityscreens/ActivityProgress';

const Stack = createNativeStackNavigator();


const PetActivityStack = ({route, navigation}) => {

    const { selectedPet, petName } = route.params;

    return (
            <Stack.Navigator>
                <Stack.Screen name="PetHomeScreen" component={PetComponent} options={{ headerShown: false }} initialParams={{ food: 0, water:0, treat:0 ,selectedPet: selectedPet, petName: petName}}/>
                <Stack.Screen name="ActivitySelectionScreen" options={{ headerShown: false }} component={ActivitySelection} />
                <Stack.Screen name="ActivityProgressScreen" options={{ headerShown: false }} component={ActivityProgress} />
            </Stack.Navigator>
        

    )
}

export default PetActivityStack