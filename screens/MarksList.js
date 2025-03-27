import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';

const MarksList = () => {
    const navigation = useNavigation();

    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [classItems, setClassItems] = useState([]);


    useFocusEffect(
        useCallback(() => {
            const fetchAttendanceData = async () => {
                try {
                    const Tid = await AsyncStorage.getItem('teacher-id');
                    const res = await axios.get(
                        `https://sjsc-backend-production.up.railway.app/api/v1/api/v1/marks/all-reports?teacherId=${Tid}`
                    );

                    setAttendanceData(res.data.marksReport);
                } catch (error) {
                    console.error('Error fetching attendance data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchAttendanceData();
        }, [])
    );



    // Handle button press
    const handleButtonPress = (item) => {
        console.log('Button pressed for:', item);
        // navigation.navigate('ViewAttendance', { id: item });
        navigation.navigate('TakeMarks', {
            classId: item.classId,
            groupId: item.groupId,
            sectionId: item.sectionId,
            marksId: item.id,
            // shift: shiftValue,
            markId: item.id,
            examName: item.Exam.name,
            teacherId: item.teacherId,
            mcq: item.Exam.mcq,
            written: item.Exam.written,
            practical: item.Exam.practical,
            quiz: item.Exam.quiz,
        });
    };

    const handleTakeMarks = (item) => {
        console.log('Edit Marks for:', item);
        navigation.navigate('EditMarks', {
            classId: item.classId,
            groupId: item.groupId,
            sectionId: item.sectionId,
            marksId: item.id,
            // shift: shiftValue,
            markId: item.id,
            examName: item.Exam.name,
            teacherId: item.teacherId,
            mcq: item.Exam.mcq,
            written: item.Exam.written,
            practical: item.Exam.practical,
            quiz: item.Exam.quiz,
        });
    }

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Marks Sheets</Text>
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
                                    {item.Exam.name}
                                </Text>
                                <Text style={{
                                    color: item.isTaken ? "green" : "red",
                                    fontWeight: "bold",
                                }}>
                                    {item.isTaken ? "Given" : "Not Given"}
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
                                    item.isTaken ? handleTakeMarks(item) : handleButtonPress(item)
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
                                        ✏️
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

export default MarksList;