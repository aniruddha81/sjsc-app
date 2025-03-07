import React, { useState, useEffect } from "react";
import { View, FlatList, Linking, ActivityIndicator } from "react-native";
import { Avatar, ListItem, Icon } from "react-native-elements";

// const teachers = [
//   {
//     id: "1",
//     name: "John Doe",
//     phone: "+1 123 456 7890",
//     email: "john.doe@example.com",
//     image: "https://randomuser.me/api/portraits/men/1.jpg",
//   },
//   {
//     id: "2",
//     name: "Jane Smith",
//     phone: "+1 987 654 3210",
//     email: "jane.smith@example.com",
//     image: "https://randomuser.me/api/portraits/women/2.jpg",
//   },
// ];

const fetchTeachers = async () => {
    try {
        const response = await fetch("https://sjsc-backend-production.up.railway.app/api/v1/teachers/fetch");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return [];
    }
};


const TeacherCard = ({ teacher }) => (
    <ListItem bottomDivider containerStyle={{ borderRadius: 10, marginVertical: 5 }}>
        <Avatar rounded size="medium" source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} />
        <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "bold" }}>{teacher.name}</ListItem.Title>
            <ListItem.Subtitle onPress={() => Linking.openURL(`tel:${teacher.phone}`)}>
                <Icon name="phone" type="feather" color="#007bff" size={16} /> {teacher.phone}
            </ListItem.Subtitle>
            <ListItem.Subtitle onPress={() => Linking.openURL(`mailto:${teacher.email}`)}>
                <Icon name="mail" type="feather" color="#ff5722" size={16} /> {teacher.email}
            </ListItem.Subtitle>
        </ListItem.Content>
        <Icon name="chevron-right" type="feather" />
    </ListItem>
);

export default function App() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTeachers().then((data) => {
            const t = data.teachers;
            setTeachers(t);
            setLoading(false);
        });
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "#F5F5F5", padding: 10 }}>
            {loading && <ActivityIndicator size="large" />}
            <FlatList
                data={teachers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TeacherCard teacher={item} />}
            />
        </View>
    );
}
