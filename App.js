import React from 'react';
// import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Home from './screens/home';
import About from './screens/about';

const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

export default function App() {
  return (<>
    {/* gonna keep this one as well for now   */}
    {/* <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
          name="Home" 
          component={Home}
          options={{title: 'Games',}} 
          />
        <Stack.Screen 
          name="About" 
          component={About} 
          options={{title: 'About',}}
        />
      </Stack.Navigator>
    </NavigationContainer> */}
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} options={{ title: 'Home' }} />
        <Drawer.Screen name="About" component={About} options={{ title: 'About' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  </>);
}
