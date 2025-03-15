import React, { useState, useEffect } from "react";
import { View, FlatList, Linking, ActivityIndicator, Text } from "react-native";
import { Avatar, ListItem, Icon } from "react-native-elements";

const fetchTeachers = async () => {
    try {
        const response = await fetch("https://sjsc-backend-production.up.railway.app/api/v1/teachers/fetch");
        const data = await response.json();
        return data?.teachers || []; // Ensure it returns an array
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return [];
    }
};

const TeacherCard = ({ teacher }) => (
    <ListItem bottomDivider containerStyle={{ borderRadius: 10, marginVertical: 5 }}>
        <Avatar rounded size="medium" source={{ uri: "https://assets.chorcha.net/ZUfPUPHLvDxY_yOveJGZm.png" }} />
        <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "bold" }}>{teacher.name}</ListItem.Title>

            <Text style={{ color: "#007bff" }} onPress={() => Linking.openURL(`tel:${teacher.phone}`)}>
                <Icon name="phone" type="feather" color="#007bff" size={16} /> {teacher.phone}
            </Text>

            <Text style={{ color: "#ff5722" }} onPress={() => Linking.openURL(`mailto:${teacher.email}`)}>
                <Icon name="mail" type="feather" color="#ff5722" size={16} /> {teacher.email}
            </Text>
        </ListItem.Content>
        <Icon name="chevron-right" type="feather" />
    </ListItem>
);

export default function App() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTeachers().then((t) => {
            setTeachers(t);
            setLoading(false);
        });
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "#F5F5F5", padding: 10 }}>
            {loading && <ActivityIndicator size="large" />}
            <FlatList
                data={teachers}
                keyExtractor={(item) => item.id.toString()} // Ensure key is a string
                renderItem={({ item }) => <TeacherCard teacher={item} />}
            />
        </View>
    );
}
