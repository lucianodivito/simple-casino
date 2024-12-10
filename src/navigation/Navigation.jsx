import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import GamesScreen from '../screens/GamesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RouletteScreen from '../screens/RouletteScreen';
import DiceScreen from '../screens/DiceScreen';
import SlotScreen from '../screens/SlotScreen';
import CoinScreen from '../screens/CoinScreen';

const Tab = createBottomTabNavigator();
const GamesStackNavigator = createNativeStackNavigator();

function GamesStack() {
  return (
    <GamesStackNavigator.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#172139',
          shadowColor: 'transparent',
        },
        headerTintColor: '#E3E8FF',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#E3E8FF',
          textShadowColor: 'rgba(0, 0, 0, 0.3)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 3,
        },
        headerLeft: () =>
          navigation.canGoBack() && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                marginLeft: 15,
                padding: 8,
                backgroundColor: '#24314e',
                borderRadius: 20,
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#E3E8FF" />
            </TouchableOpacity>
          ),
      })}
    >
      <GamesStackNavigator.Screen
        name="GamesStack"
        component={GamesScreen}
        options={{ headerShown: false }}
      />
      <GamesStackNavigator.Screen
        name="Roulette"
        component={RouletteScreen}
        options={{ title: 'Roulette' }}
      />
      <GamesStackNavigator.Screen name="Dice" component={DiceScreen} />
      <GamesStackNavigator.Screen
        name="Slot"
        component={SlotScreen}
        options={{ title: 'Slots' }}
      />
      <GamesStackNavigator.Screen
        name="Coin"
        component={CoinScreen}
        options={{ title: 'Coin flip' }}
      />
    </GamesStackNavigator.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Games') {
            iconName = focused ? 'game-controller' : 'game-controller-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
                backgroundColor: focused ? '#24314e' : 'transparent',
                borderRadius: 25,
              }}
            >
              <Ionicons name={iconName} size={28} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: '#172139',
            borderTopColor: 'transparent',
          },
        ],
      })}
    >
      <Tab.Screen
        name="Games"
        component={GamesStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen component={SettingsScreen} name="Settings" />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 10,
    paddingTop: 10,
    borderTopWidth: 0,
  },
  tabBarIcon: {
    marginTop: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
});
