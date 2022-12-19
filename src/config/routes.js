import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Swipe from '../screens/Swipe';
import History from '../screens/History';
import Message from '../screens/Message';

const Stack = createNativeStackNavigator();

const Routes = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainPage"
          component={Swipe}
          options={{
            title: 'Swipe',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{
            title: 'History',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Message"
          headerBackButtonMenuEnabled={false}
          component={Message}
          options={{
            title: 'Message',
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
