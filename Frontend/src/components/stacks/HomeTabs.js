import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PetComponent from '../homescreens/petscreen';
import UserListComponent from '../homescreens/userlist';
import Dashboard from '../homescreens/Dashboard';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="PetHome" component={PetComponent} options={{ headerShown: false }}/>
            <Tab.Screen name="Leaderboard" component={UserListComponent} />
            <Tab.Screen name="Dashboard" component={Dashboard} />
        </Tab.Navigator>
    );
}

export default HomeTabs