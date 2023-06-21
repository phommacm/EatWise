// App.js

// Entry point of the application.

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HealthGoalsScreen from './screens/HealthGoalsScreen';
import FoodDatabaseScreen from './screens/FoodDatabaseScreen';
import MealPlanningScreen from './screens/MealPlanningScreen';
import { MealPlanProvider } from './MealPlanContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <MealPlanProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconSource;
              if (route.name === 'Health Goals') {
                iconSource = focused
                  ? require('./icons/hg-icon-active.png')
                  : require('./icons/hg-icon-inactive.png');
              } else if (route.name === 'Food Database') {
                iconSource = focused
                  ? require('./icons/db-icon-active.png')
                  : require('./icons/db-icon-inactive.png');
              } else if (route.name === 'Meal Planning') {
                iconSource = focused
                  ? require('./icons/mp-icon-active.png')
                  : require('./icons/mp-icon-inactive.png');
              }
              return <Image source={iconSource} style={styles.tabIcon} />;
            },
            tabBarShowLabel: false,
          })}
        >
          <Tab.Screen name="Health Goals" component={HealthGoalsScreen} />
          <Tab.Screen name="Food Database" component={FoodDatabaseScreen} />
          <Tab.Screen name="Meal Planning" component={MealPlanningScreen} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </MealPlanProvider>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
  },
});
