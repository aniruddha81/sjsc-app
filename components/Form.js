import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from "@react-native-community/datetimepicker";

const TeacherDropdownForm = () => {
    const navigation = useNavigation();

    const [teacherData, setTeacherData] = useState(null);
    const [loading, setLoading] = useState(true);

    //  Date 
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }

    };

    // State for School Dropdown
    const [schoolItems, setSchoolItems] = useState([
        { label: "School", value: "school" },
        { label: "College", value: "college" }
    ]);
    const [schoolValue, setSchoolValue] = useState(null);
    const [openSchool, setOpenSchool] = useState(false);

    // State for Shift Dropdown
    const [openShift, setOpenShift] = useState(false);
    const [shiftValue, setShiftValue] = useState(null);
    const [shiftItems, setShiftItems] = useState([]);


    // State for Class Dropdown
    const [openClass, setOpenClass] = useState(false);
    const [classValue, setClassValue] = useState(null);
    const [classItems, setClassItems] = useState([]);

    // State for Group Dropdown
    const [openGroup, setOpenGroup] = useState(false);
    const [groupValue, setGroupValue] = useState(null);
    const [groupItems, setGroupItems] = useState([]);

    // State for Section Dropdown
    const [openSection, setOpenSection] = useState(false);
    const [sectionValue, setSectionValue] = useState(null);
    const [sectionItems, setSectionItems] = useState([]);

    // Fetch Teacher Data
    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const Tid = await AsyncStorage.getItem('teacher-id');
                const res = await axios.get(
                    `https://sjsc-backend-production.up.railway.app/api/v1/teachers/fetch/${Tid}`
                );
                setTeacherData(res.data.teacher);
                setLoading(false);

                // Set Class Items
                const classes = res.data.teacher.assignedClasses?.map(cls => ({
                    label: cls.name,
                    value: cls.id,
                }));
                setClassItems(classes);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
                setLoading(false);
            }
        };

        fetchTeacherData();
    }, []);

    // Update Group Items when Class is selected
    // useEffect(() => {
    //     if (teacherData) {
    //         const shifts = teacherData.assignedShift
    //             ?.map(shift => shift)

    //         setShiftItems(shifts);
    //         setGroupItems(null);
    //         setGroupValue(null);
    //         setSectionValue(null);
    //     }
    // }, [schoolValue, teacherData]);

    useEffect(() => {
        if (classValue && teacherData) {
            const groups = teacherData.assignedGroups
                ?.filter(group => group.Class.id === classValue)
                ?.map(group => ({
                    label: group.name,
                    value: group.id,
                }));
            setGroupItems(groups);
            setGroupValue(null);
            setSectionValue(null);
        }
    }, [classValue, teacherData]);

    // Update Section Items when Group is selected
    useEffect(() => {
        if (classValue && teacherData) {
            const sections = teacherData.assignedSections
                ?.filter(section => section.Class.id === classValue)
                ?.map(section => ({
                    label: section.name,
                    value: section.id,
                }));
            setSectionItems(sections);
            setSectionValue(null);
        }
    }, [classValue, teacherData]);

    const handleSubmit = async () => {
        try {
            const payload = {
                classId: classValue,
                groupId: groupValue,
                sectionId: sectionValue,
                date: date,
            };

            console.log('Submission successful:', payload);
            // Pass payload to next screen\
            // navigation.navigate('TakeAttendance', {
            //     classId: classValue,
            //     groupId: groupValue,
            //     sectionId: sectionValue,
            // });



        } catch (error) {
            console.error('Submission failed:', error);
        }
    };

    const takeAttendance = async () => {
        try {
            const Tid = await AsyncStorage.getItem("teacher-id");
            const token = await AsyncStorage.getItem("token");
            console.log(parseInt(Tid),
                classValue,
                sectionValue,
                groupValue,
            )

            const response = await axios.post(
                // `http://192.168.0.101:3000/api/v1/attendance/create/report`,
                `https://sjsc-backend-production.up.railway.app/api/v1/attendance/create/report`,
                {
                    teacherId: parseInt(Tid),
                    classId: classValue,
                    sectionId: sectionValue || null,
                    groupId: groupValue || null,
                    date,
                    remarks: "",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            if (response.data.message == "Attendance report created successfully") {
                navigation.navigate("TakeAttendance", {
                    classId: classValue,
                    sectionId: sectionValue,
                    groupId: groupValue,
                    attendanceId: response.data.data.id,
                });
                // console.log(response.data);
            } else {
                alert(response.data.message);
                if (response.data.id) {
                    console.log(response.data);
                    navigation.navigate("TakeAttendance", {
                        classId: classValue,
                        sectionId: sectionValue,
                        groupId: groupValue,
                        attendanceId: response?.data?.id,
                    });
                }
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
                console.log("Error response:", error.response.data);

            } else {
                console.error("Error message:", error.message);
            }
        }
    }

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            {/* Level Dropdown */}
            <Text style={styles.label}>Level</Text>
            <DropDownPicker
                open={openSchool}
                value={schoolValue}
                items={schoolItems}
                setOpen={setOpenSchool}
                setValue={setSchoolValue}
                setItems={setSchoolItems}
                placeholder="Select School or College"
                style={styles.dropdown}
                zIndex={4000}

            />

            {schoolValue === "school" && (
                <>
                    <Text style={styles.label}>Shift</Text>
                    <DropDownPicker
                        open={openShift}
                        value={shiftValue}
                        items={shiftItems}
                        setOpen={setOpenShift}
                        setValue={setShiftValue}
                        setItems={setShiftItems}
                        placeholder="Select Shift"
                        style={styles.dropdown}
                        zIndex={3300}
                    />
                </>
            )}

            {/* Class Dropdown */}
            <Text style={styles.label}>Class</Text>
            <DropDownPicker
                open={openClass}
                value={classValue}
                items={classItems}
                setOpen={setOpenClass}
                setValue={setClassValue}
                setItems={setClassItems}
                placeholder="Select Class"
                style={styles.dropdown}
                zIndex={3000}
            />

            {/* Group Dropdown */}
            <Text style={styles.label}>Group</Text>
            <DropDownPicker
                open={openGroup}
                value={groupValue}
                items={groupItems}
                setOpen={setOpenGroup}
                setValue={setGroupValue}
                setItems={setGroupItems}
                placeholder="Select Group"
                style={styles.dropdown}
                zIndex={2000}
                disabled={!classValue}
            />

            {/* Section Dropdown */}
            <Text style={styles.label}>Section</Text>
            <DropDownPicker
                open={openSection}
                value={sectionValue}
                items={sectionItems}
                setOpen={setOpenSection}
                setValue={setSectionValue}
                setItems={setSectionItems}
                placeholder="Select Section"
                style={styles.dropdown}
                zIndex={1000}
                disabled={!classValue}
            />

            {/* Date Picker */}
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "#ccc",
                marginBottom: 10,
            }} onPress={() => setShowPicker(true)}>
                <Text style={styles.dateText}>📅 {date.toDateString()}</Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}

            {/* Submit Btn */}
            {classValue && groupValue && sectionValue ?
                <Button title="Submit" onPress={takeAttendance} /> : null}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10,
    },
    dropdown: {
        marginBottom: 10,
    },
});

export default TeacherDropdownForm;