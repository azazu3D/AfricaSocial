import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import des écrans
import HomeScreen from './src/screens/HomeScreen';
import PublishScreen from './src/screens/PublishScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Accueil':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Publier':
                iconName = focused ? 'add-circle' : 'add-circle-outline';
                break;
              case 'Analyses':
                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                break;
              case 'Profil':
                iconName = focused ? 'person' : 'person-outline';
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Accueil" 
          component={HomeScreen}
          options={{
            title: 'AfricaSocial',
          }}
        />
        <Tab.Screen name="Publier" component={PublishScreen} />
        <Tab.Screen name="Analyses" component={AnalyticsScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
} 