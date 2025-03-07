import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Dashboard from './screens/Dashboard';
import Header from './components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import LoginScreen from './screens/auth/Login';
import Attendance from './screens/AttendanceForm';
import TakeAttendance from './screens/TakeAttendance';
import Marks from './screens/Marks';
import Notice from './screens/Notice';
import Teachers from './screens/Teachers';

const Stack = createNativeStackNavigator();

export default function App() {
  // Get AsyncStorage
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("token");
      setValue(token);
    };

    checkLoginStatus();
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          value === null ?
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: 'Login',
                headerStyle: { backgroundColor: '#111' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
                headerTextAlign: 'center'
              }}
            />
            :
            (
              <>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    header: () => <Header />,
                  }}
                />
                <Stack.Screen
                  name="Attendance"
                  component={Attendance}
                  options={{
                    title: 'Attendance',
                    headerStyle: { backgroundColor: '#111' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTextAlign: 'center'
                  }}
                />
                <Stack.Screen
                  name="TakeAttendance"
                  component={TakeAttendance}
                  options={{
                    title: 'Attendance',
                    headerStyle: { backgroundColor: '#111' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTextAlign: 'center'
                  }}
                />
                <Stack.Screen
                  name="Marks"
                  component={Marks}
                  options={{
                    title: 'Attendance',
                    headerStyle: { backgroundColor: '#111' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTextAlign: 'center'
                  }}
                />
                <Stack.Screen
                  name="Notice"
                  component={Notice}
                  options={{
                    title: 'Attendance',
                    headerStyle: { backgroundColor: '#111' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTextAlign: 'center'
                  }}
                />
                <Stack.Screen
                  name="Teachers"
                  component={Teachers}
                  options={{
                    title: 'Teachers',
                    headerStyle: { backgroundColor: '#111' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTextAlign: 'center'
                  }}
                />
              </>

            )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
