import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';
import Characters from '../screens/characters';

const Stack = createNativeStackNavigator();

const Routes = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Connexion'}}
        />
        <Stack.Screen
          name="Characters"
          component={Characters}
          options={{title: 'Personnages'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
