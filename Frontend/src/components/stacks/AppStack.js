import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../login/LoginScreen';
import HomeTabs from './HomeTabs';
import PetSelectScreen from '../login/PetSelectScreen';
import Leaderboard from '../homescreens/leaderboard';
import RecoverPassword from '../login/RecoverPassword'
import SetPassword from '../login/SetPassword'
import CreateAccount from '../screens/CreateAccount';
import styles from '../style';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />

        {/* <Stack.Screen name="Leaderboard" component={Leaderboard} /> */}

        <Stack.Screen name="PetSelect" component={PetSelectScreen} options={{headerTitle: "",headerShown: true,headerBackTitleVisible: false}}/>
        <Stack.Screen name="ForgotPassword" component={RecoverPassword} options={{headerTitle: "",headerShown: true,headerBackTitleVisible: false}} 
  />
        <Stack.Screen name="SetPassword" component={SetPassword} options={{headerTitle: "",headerShown: true,headerBackTitleVisible: false}}  />
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{headerTitle: "",headerShown: true,headerBackTitleVisible: false}}/>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
