import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';

const AttendanceReport = () => {
  const navigation = useNavigation();

  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [classItems, setClassItems] = useState([]);

  // Fetch Attendance Data
  // useEffect(() => {
  //   const fetchAttendanceData = async () => {
  //     try {
  //       const Tid = await AsyncStorage.getItem('teacher-id');
  //       const res = await axios.get(
  //         `https://sjsc-backend-production.up.railway.app/api/v1/attendance/fetch/teacher-report/${Tid}`
  //       );

  //       // Filter records where isTaken = false
  //       // const filteredData = res.data.filter(record => record.isTaken === false);

  //       // Sort by date in descending order
  //       const sortedData = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));

  //       setAttendanceData(sortedData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching attendance data:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchAttendanceData();
  //   fetchClassItems();
  // }, []);
  useFocusEffect(
    useCallback(() => {
      const fetchAttendanceData = async () => {
        try {
          const Tid = await AsyncStorage.getItem('teacher-id');
          const res = await axios.get(
            `https://sjsc-backend-production.up.railway.app/api/v1/attendance/fetch/teacher-report/${Tid}`
          );

          const sortedData = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setAttendanceData(sortedData);
        } catch (error) {
          console.error('Error fetching attendance data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchAttendanceData();
    }, [])
  );

  const fetchClassItems = async () => {
    try {
      const res = await axios.get(`https://sjsc-backend-production.up.railway.app/api/v1/settings/fetch/class`);
      setClassItems(res.data);
    } catch (error) {
      console.error('Error fetching class items:', error);
    }
  }


  // Handle button press
  const handleButtonPress = (item) => {
    console.log('Button pressed for:', item);
    navigation.navigate('ViewAttendance', { id: item });
  };

  const handleTakeAttendance = (item) => {
    console.log('Take attendance for:', item);
    navigation.navigate('TakeAttendance', {
      classId: item.classId,
      groupId: item.groupId,
      sectionId: item.sectionId,
      className: item.Class?.name,
      groupName: item.Group?.name,
      sectionName: item.Section?.name,
      attendanceId: item.id,
    });
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendance Reports</Text>
      {attendanceData.length > 0 ? (
        <FlatList
          data={attendanceData}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#f9f9f9",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 16, // Increased padding for better spacing
                paddingVertical: 12, // Increased padding for better spacing
                marginVertical: 8, // Increased margin for better separation
                borderRadius: 10,
                borderWidth: 1, // Added border for better visual separation
                borderColor: "#e0e0e0", // Light border color
              }}
            >
              {/* Date Column */}
              <View style={{ flex: 1 }}>
                <Text style={[styles.cell, { flex: 1 }]}>
                  {dayjs(item.date).format("D MMMM")}
                </Text>
                <Text style={{
                  color: item.isTaken ? "green" : "red",
                  fontWeight: "bold",
                }}>
                  {item.isTaken ? "Taken" : "Not Taken"}
                </Text>
              </View>


              {/* Class, Group, and Section Column */}
              <View style={{ flex: 2, marginLeft: 16 }}>
                <Text style={styles.cell}>{item?.Class?.name}</Text>
                <Text style={styles.cell}>
                  {item?.Group?.name || "N/A"} ({item?.Section?.name || "N/A"})
                </Text>
              </View>

              {/* Status Column */}
              <TouchableOpacity
                onPress={() =>
                  item.isTaken ? handleButtonPress(item.id) : handleTakeAttendance(item)
                }
                style={{ flex: 1, alignItems: "flex-end" }}
              >
                <Text
                  style={{
                    ...styles.cell,
                    color: item.isTaken ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {/* <Text>{item.isTaken ? "Taken" : "Not Taken"}</Text> */}
                  <Text>
                    {item.isTaken ? <Icon
                      name="eye"
                      type="feather"
                      size={18}
                      color="#007bff"
                    /> :
                      "✏️"
                    }
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>No attendance records found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default AttendanceReport;