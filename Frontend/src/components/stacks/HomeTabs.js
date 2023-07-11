import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../homescreens/Dashboard';
import Leaderboard from '../homescreens/leaderboard';
import PetActivityStack from './PetActivityStack';

const Tab = createBottomTabNavigator();

const HomeTabs = ({route, navigation}) => {

  const { selectedPet } = route.params;

  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen name="Homescreen" component={PetActivityStack} initialParams={{selectedPet : selectedPet}}/>
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
