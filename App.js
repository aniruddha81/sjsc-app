import { StyleSheet, View, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import LoginScreen from './screens/auth/Login';
import Attendance from './screens/AttendanceForm';
import TakeAttendance from './screens/TakeAttendance';
import Marks from './screens/Marks';
import Notice from './screens/Notice';
import Teachers from './screens/Teachers';
import ViewAttendance from './screens/ViewAttendance';
import Profile from './screens/Profile';
import TakeMarks from './screens/TakeMarks';
import EditMarks from './screens/EditMarks';
import MarksLists from './screens/MarksList';


const Stack = createNativeStackNavigator();

export default function App() {
  // Get AsyncStorage
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setValue(token);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          value === null ? (
            <Stack.Screen
              name="Login"
              options={{
                headerShown: false
              }}
            >
              {(props) => (
                <SafeAreaView style={{ flex: 1 }}>
                  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <LoginScreen {...props} setValue={setValue} />
                  </ScrollView>
                </SafeAreaView>
              )}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                options={{
                  header: () => <Header />,
                }}
              >
                {(props) => (
                  <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                      <HomeScreen {...props} setValue={setValue} />
                    </ScrollView>
                  </SafeAreaView>
                )}
              </Stack.Screen>

              <Stack.Screen
                name="Attendance"
                component={Attendance}
                options={{
                  title: 'Attendance',
                  headerStyle: { backgroundColor: '#eee' },
                  headerTintColor: '#111',
                  headerTextAlign: 'center',
                  detachPreviousScreen: false,
                }}
              />
              <Stack.Screen
                name="TakeAttendance"
                component={TakeAttendance}
                options={{
                  title: 'Attendance',
                  headerStyle: { backgroundColor: '#eee' },
                  headerTintColor: '#111',
                  headerTextAlign: 'center',
                  detachPreviousScreen: false,
                }}
              />
              <Stack.Screen
                name="Marks"
                component={Marks}
                options={{
                  title: 'Marks',
                  headerStyle: { backgroundColor: '#eee' },
                  headerTintColor: '#111',
                  headerTextAlign: 'center',
                  detachPreviousScreen: false,
                }}
              />
              <Stack.Screen
                name="Notice"
                component={Notice}
                options={{
                  title: 'Attendance History',
                  headerStyle: { backgroundColor: '#eee' },
                  headerTintColor: '#111',
                  headerTextAlign: 'center',
                  detachPreviousScreen: false,
                }}
              />
              <Stack.Screen
                name="Teachers"
                component={Teachers}
                options={{
                  title: 'Teachers',
                  headerStyle: { backgroundColor: '#eee' },
                  headerTintColor: '#111',
                  headerTextAlign: 'center',
                  detachPreviousScreen: false,
                }}
                
              />
              <Stack.Screen
                name="ViewAttendance"
                component={ViewAttendance}
                options={{
                  title: 'View Attendance',
                  headerStyle: { backgroundColor: '#eee' },
                  headerTintColor: '#111',
                  headerTextAlign: 'center',
                  detachPreviousScreen: false,
                }}
              />
              <Stack.Screen
                name="TakeMarks"
                component={TakeMarks}
                options={{
                  title: 'Put Marks',
                  headerStyle: { backgroundColor: '#eee' },
                  headerTintColor: '#111',
                  headerTextAlign: 'center',
                  detachPreviousScreen: false,
                }}
              />
              <Stack.Screen
                name="EditMarks"
                component={EditMarks}
                options={{
                  title: 'Edit Marks',
                  headerStyle: { backgroundColor: '#eee' },
                  headerTintColor: '#111',
                  headerTextAlign: 'center',
                  detachPreviousScreen: false,
                }}
              />
              <Stack.Screen
                name="MarksList"
                component={MarksLists}
                options={{
                  title: 'Marks List',
                  headerStyle: { backgroundColor: '#eee' },
                  headerTintColor: '#111',
                  headerTextAlign: 'center',
                  detachPreviousScreen: false,
                }}
              />
              {/* <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                  title: 'Profile',
                  headerStyle: { backgroundColor: '#111' },
                  headerTintColor: '#fff',
                  headerTitleStyle: { fontWeight: 'bold' },
                  headerTextAlign: 'center'
                }}
              /> */}
              <Stack.Screen
                name="Profile"
                options={{
                  title: 'Profile',
                  headerStyle: { backgroundColor: '#eee' },
                  headerTintColor: '#111',
                  headerTextAlign: 'center'
                }}
              >
                {(props) => (
                  <SafeAreaView style={{ flex: 1 }}>
                    <Profile setValue={setValue} />
                  </SafeAreaView>
                )}
              </Stack.Screen>
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
