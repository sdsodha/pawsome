import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PetComponent from '../homescreens/petscreen';
import Dashboard from '../homescreens/Dashboard';
import Leaderboard from '../homescreens/leaderboard';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="PetHome"
        component={PetComponent}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
