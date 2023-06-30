import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserListComponent from '../homescreens/userlist';
import Dashboard from '../homescreens/Dashboard';
import PetActivityStack from './PetActivityStack';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Homescreen" component={PetActivityStack} options={{ headerShown: false }}/>
            <Tab.Screen name="Leaderboard" component={UserListComponent} />
            <Tab.Screen name="Dashboard" component={Dashboard} />
        </Tab.Navigator>
    );
}

export default HomeTabs