import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screen/Home';
import Details from './Screen/Details';
const Stack = createStackNavigator();
export default class App extends Component {

  render() {

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>

          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Home" component={HomeScreen} />


        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
