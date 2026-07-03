import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import DashboardScreen from '../screens/Main/DashboardScreen';
import HistoryScreen from '../screens/Main/HistoryScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';
import { COLORS } from '../theme/Theme';

const Tab = createBottomTabNavigator();

const EmptyScreen = () => <View />;

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primaryGreen,
        tabBarInactiveTintColor: COLORS.textGray,
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          elevation: 10,
          backgroundColor: COLORS.white,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Beranda") iconName = "home";
          else if (route.name === "Grading") iconName = "scan";
          else if (route.name === "Riwayat") iconName = "time";
          else if (route.name === "Profil") iconName = "person";
          return <Ionicons name={iconName} size={26} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Beranda" component={DashboardScreen} />
      <Tab.Screen
        name="Grading"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Scanner");
          },
        })}
      />
      <Tab.Screen name="Riwayat" component={HistoryScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
