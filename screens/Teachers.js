import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    FlatList,
    Linking,
    ActivityIndicator,
    Text,
    RefreshControl,
    StyleSheet,
    TextInput,
} from "react-native";
import { Avatar, ListItem, Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";

const fetchTeachers = async () => {
    try {
        const response = await fetch("https://sjsc-backend-production.up.railway.app/api/v1/teachers/fetch");
        const data = await response.json();
        return data?.teachers || []; // Ensure it returns an array
    } catch (error) {
        console.error("Error fetching teachers:", error);
        throw error; // Rethrow to handle in the component
    }
};

const TeacherCard = ({ teacher }) => (
    <ListItem
        containerStyle={styles.cardContainer}
        onPress={() => Linking.openURL(`tel:${teacher.phone}`)} // Add interaction
    >
        <Avatar rounded size="medium" source={{ uri: "https://assets.chorcha.net/ZUfPUPHLvDxY_yOveJGZm.png" }} />
        <ListItem.Content>
            <ListItem.Title style={styles.name}>{teacher.name}</ListItem.Title>
            <View style={styles.contactContainer}>
                <Icon name="phone" type="feather" color="#6C63FF" size={14} />
                <Text style={styles.contactText} onPress={() => Linking.openURL(`tel:${teacher.phone}`)}>
                    {teacher.phone}
                </Text>
            </View>
            <View style={styles.contactContainer}>
                <Icon name="mail" type="feather" color="#FF6584" size={14} />
                <Text style={styles.contactText} onPress={() => Linking.openURL(`mailto:${teacher.email}`)}>
                    {teacher.email}
                </Text>
            </View>
        </ListItem.Content>
        <Icon name="chevron-right" type="feather" color="#ccc" size={18} />
    </ListItem>
);

export default function App() {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const loadTeachers = async () => {
        try {
            const data = await fetchTeachers();
            setTeachers(data);
            setFilteredTeachers(data); // Initialize filtered list
            setError(null);
        } catch (error) {
            setError("Failed to load teachers. Please try again.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // useEffect(() => {
    //     loadTeachers();
    // }, []);

    useFocusEffect(
        useCallback(() => {
            loadTeachers();
        }, [])
    );



    useEffect(() => {
        // Filter teachers based on search query
        if (searchQuery) {
            const filtered = teachers.filter((teacher) =>
                teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredTeachers(filtered);
        } else {
            setFilteredTeachers(teachers); // Reset to all teachers if search is empty
        }
    }, [searchQuery, teachers]);

    const onRefresh = () => {
        setRefreshing(true);
        loadTeachers();
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <TextInput
                style={styles.searchBar}
                placeholder="Search teachers by name..."
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#6C63FF" />
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <Icon name="refresh" type="feather" color="#6C63FF" size={24} onPress={onRefresh} />
                </View>
            ) : (
                teachers.length > 0 ? (
                    <FlatList
                        data={filteredTeachers}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <TeacherCard teacher={item} />}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#6C63FF"]} />
                        }
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>No teachers found.</Text>
                        }
                    />
                ) : (
                    <Text style={styles.emptyText}>No teachers found.</Text>
                )
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 10,
    },
    searchBar: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 14,
        color: "#333",
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardContainer: {
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    name: {
        fontWeight: "600",
        fontSize: 14,
        marginBottom: 4,
        color: "#333",
    },
    contactContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 2,
    },
    contactText: {
        marginLeft: 8,
        fontSize: 12,
        color: "#6C63FF",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "#FF6584",
        fontSize: 14,
        marginBottom: 10,
    },
    emptyText: {
        textAlign: "center",
        fontSize: 14,
        color: "#888",
        marginTop: 20,
    },
});