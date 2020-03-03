/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './components/screens/home';
import SettingsScreen from './components/screens/settings';
// import ProfileScreen from './components/screens/profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import LocalFilesListScreen from './components/screens/localfiles';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

const HomeTabStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="LocalFile" component={LocalFilesListScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};



const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeTabStack}
          options={{
            tabBarIcon: ({color, size}) => <Icon name="home" size={30} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            tabBarIcon: ({color, size}) => <Icon name="cogs" size={30} />,

          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

/*const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};*/

const styles = StyleSheet.create({});

export default App;
