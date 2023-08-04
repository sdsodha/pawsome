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
    //tabBarOptions
    screenOptions={{ //try screenOptions instead of tabBarOptions
      inactiveTintColor: 'blue',
      activeTintColor: 'red',
      headerShown: true,
      showIcon:true,
      showLabel: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: '#EEEDFA',
        height:60,
        borderTopLeftRadius: 20, // Set the desired border radius for the top-left corner
        borderTopRightRadius: 20, // Set the desired border radius for the top-right corner
           
          borderTopWidth: 5, // Add a border to the top of the tab bar
          borderTopColor: '#EEEDFA', // Set the color of the border
          borderBottomWidth: 1,
        
      },
      // tabBarActiveBackgroundColor:'pink',
      style: {
        backgroundColor: 'red', // Make the tab bar background transparent
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
            source={focused ? require('../../../assets/homeIconFocused.png') : require('../../../assets/homeIcon.png')}
            style={{ width: 80, height: 59, /*tintColor: focused ? null : 'gray'*/ }}
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
            source={focused ? require('../../../assets/leaderIconFocused.png') : require('../../../assets/leaderIcon.png')}
            style={{ width: 80, height: 59, /*tintColor: focused ? null : 'gray'*/ }}
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
            source={focused ? require('../../../assets/dashIconFocused.png') : require('../../../assets/dashIcon.png')}
            style={{ width: 80, height: 59, /*tintColor: focused ? null : 'gray'*/ }}
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
