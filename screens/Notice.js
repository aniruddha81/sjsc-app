import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AttendanceReport from '../components/PreviousAttendance';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AttendanceReport />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;