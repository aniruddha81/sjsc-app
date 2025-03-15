import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateProfileForm = ({ setValue }) => {
    const navigation = useNavigation();

    // State for form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const getTeacher = async () => {
        try {
            const teacher_id = await AsyncStorage.getItem('teacher-id');
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`https://sjsc-backend-production.up.railway.app/api/v1/teachers/fetch/${teacher_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const { name, email, phone, password } = response.data.teacher;
                setName(name);
                setEmail(email);
                setPhone(phone);
                setPassword(password)
            }
        } catch (error) {
            console.error("Error fetching teacher data:", error);
            alert("An error occurred. Please try again.");
        }
    }
    useEffect(() => {
        getTeacher();
    }, []);



    // Handle form submission
    const handleSubmit = async () => {
        if (!name || !email || !phone) {
            alert("Please fill all fields");
            return;
        }

        const data = {
            name,
            email,
            phone,
            password
        };

        try {
            const teacher_id = await AsyncStorage.getItem('teacher-id');
            const token = await AsyncStorage.getItem('token');
            const response = await axios.put(
                `https://sjsc-backend-production.up.railway.app/api/v1/teachers/update-info/${teacher_id}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("Profile updated successfully");
                navigation.goBack(); // Navigate back after successful update
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Update Profile</Text>

            {/* Name Field */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* Email Field */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            {/* Phone Field */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your Password"
                    value={password}
                    onChangeText={setPassword}
                    keyboardType="phone-pad"
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
                ...styles.button,
                backgroundColor: "darkred",
            }}
                onPress={() => {
                    AsyncStorage.removeItem('token');
                    setValue(null);
                }}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        color: "#333",
        textAlign: "center",
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    input: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 24,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default UpdateProfileForm;