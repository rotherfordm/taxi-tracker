import React from "react";
import { Platform, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createStackNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import TaxiMapScreen from "../screens/TaxiMapScreen";
import TaxiHistoryScreen from "../screens/TaxiHistoryScreen";

import Colors from "../constants/Colors";

const TaxiTransactionNavigator = createStackNavigator({
  NewTaxi: TaxiMapScreen,
});

const TaxiHistoryNavigator = createStackNavigator({
  TaxiHistory: TaxiHistoryScreen,
});

//Bottom tab navigator
const tabScreenConfig = {
  StartTaxi: {
    screen: TaxiTransactionNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-car" size={25} color={Colors.primary} />;
      },
      tabBarColor: Colors.accent,
      tabBarLabel: <Text style={{ color: Colors.primary }}>Track Taxi</Text>,
    },
  },
  TaxiHistory: {
    screen: TaxiHistoryNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-paper" size={25} color={Colors.primary} />;
      },
      tabBarColor: Colors.accent,
      tabBarLabel: <Text style={{ color: Colors.primary }}>Taxi History</Text>,
    },
  },
};

const StartTaxiTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        shifting: true,
        tabBarOptions: {
          activeTintColor: Colors.accent,
        },
        barStyle: {
          backgroundColor: Colors.primary,
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accent,
        },
      });

export default createAppContainer(StartTaxiTabNavigator);
