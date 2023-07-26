import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../homescreens/Dashboard';
import Leaderboard from '../homescreens/leaderboard';
import PetActivityStack from './PetActivityStack';

import { NavigationContainer } from '@react-navigation/native'
import {Image,View} from 'react-native'



const Tab = createBottomTabNavigator();

const HomeTabs = ({route, navigation}) => {

  const { selectedPet, petName } = route.params;
 

  return (
    
    <Tab.Navigator 
    tabBarOptions={{ //try screenOptions instead of tabBarOptions
      inactiveTintColor: 'blue',
      activeTintColor: 'red',
      headerShown: true,
      showIcon:true,
      showLabel: false,
      
      // tabBarActiveBackgroundColor:'pink',
      style: {
        backgroundColor: 'transparent', // Make the tab bar background transparent
        position: 'absolute', // Position the tab bar at the bottom of the screen
        left: 0,
        right: 0,
      }
    }}
   >
      <Tab.Screen name="Homescreen" component={PetActivityStack} initialParams={{selectedPet : selectedPet, petName: petName}}
      options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
          source={focused ? require('../../../assets/leaderboardIconFocused.png') : require('../../../assets/leaderboardIcon.png')}
            style={{ width: 100, height: 60, /*tintColor: focused ? null : 'gray'*/ }}
          />
        ),
        // tabBarIcon: ({ color }) => (
        //   <CustomTabBarIcon iconUri={dashIcon} />
        // ),
      }}
     />
      <Tab.Screen name="Leaderboard" component={Leaderboard} 
      options={{
        tabBarIcon: ({ focused }) => (
          <Image
          source={focused ? require('../../../assets/dashboardIconFocused.png') : require('../../../assets/dashboardIcon.png')}
            
            style={{ width: 100, height: 60, /*tintColor: focused ? null : 'gray'*/ }}
          />
        ),
        // tabBarIcon: ({ color }) => (
        //   <CustomTabBarIcon iconUri={require('../../../assets/leaderboardIcon.svg')} />
        // ),
      }}/>
      <Tab.Screen name="Dashboard" component={Dashboard}
      options={{
        tabBarIcon: ({ focused }) => (
          <Image
          source={focused ? require('../../../assets/homescreenIconFocused.png') : require('../../../assets/homescreenIcon.png')}
           
            style={{ width: 100, height: 60, /*tintColor: focused ? null : 'gray'*/ }}
          /> 
        ),
        // tabBarIcon: ({ color }) => (
        //   <CustomTabBarIcon iconUri={require('../../../assets/homescreenIcon.svg')} />
        // ),
      }} />

    </Tab.Navigator>
   
    
  );
};

export default HomeTabs;
