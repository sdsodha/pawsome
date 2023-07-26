import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PetComponent from '../homescreens/petscreen';
import ActivitySelection from '../activityscreens/ActivitySelection';
import ActivityProgress from '../activityscreens/ActivityProgress';
import PetLeftComponent from '../homescreens/PetLeftScreen';
import PetLeftActivityProgress from '../activityscreens/PetLeftActivityProgress';

const Stack = createNativeStackNavigator();


const PetActivityStack = ({ route, navigation }) => {

    const { selectedPet, petName } = route.params;

    return (
        <Stack.Navigator>
            {petName === "LEFT" ?
                (
                    <Stack.Group>
                        <Stack.Screen name="PetLeftScreen" component={PetLeftComponent} options={{ headerTitle: "Home", headerShown: true }} initialParams={{ food: 0, water: 0, treat: 0, selectedPet: selectedPet, petName: petName }}/>
                        <Stack.Screen name="PetLeftActivityProgressScreen" options={{ headerShown: false }} component={PetLeftActivityProgress} />
                        <Stack.Screen name="PetHomeScreen" component={PetComponent} options={{ headerTitle: "Home", headerShown: true, headerBackVisible: false, }} initialParams={{ food: 0, water: 0, treat: 0, selectedPet: 1, petName: "Shady" }} />
                        <Stack.Screen name="ActivitySelectionScreen" options={{ headerShown: false }} component={ActivitySelection} />
                        <Stack.Screen name="ActivityProgressScreen" options={{ headerShown: false }} component={ActivityProgress} />
                    </Stack.Group>
                ) :
                (
                    <Stack.Group>
                        <Stack.Screen name="PetHomeScreen" component={PetComponent} options={{ headerTitle: "Home", headerShown: true }} initialParams={{ food: 0, water: 0, treat: 0, selectedPet: selectedPet, petName: petName }} />
                        <Stack.Screen name="ActivitySelectionScreen" options={{ headerShown: false }} component={ActivitySelection} />
                        <Stack.Screen name="ActivityProgressScreen" options={{ headerShown: false }} component={ActivityProgress} />
                    </Stack.Group>
                )
            }
        </Stack.Navigator>
    )
}

export default PetActivityStack