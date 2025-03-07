import React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menus = [
    {
        item: 'Attendance',
        icon: 'people',
        href: 'Attendance',
    },
    {
        item: 'Marks',
        icon: 'edit',
        href: 'Marks',
    },
    {
        item: 'Notice',
        icon: 'note',
        href: 'Notice',
    },
    {
        item: 'Teachers',
        icon: 'people',
        href: 'Teachers',
    },
];

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        // <Button
        //     title="Go to Jane's profile"
        //     onPress={() =>
        //         navigation.navigate('Dashboard')
        //     }
        // />
        <View style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            padding: 20,
            alignItems: 'center',

        }}>
            {Menus.map((menu, index) => (
                <Card key={index} item={menu.item} icon={menu.icon} href={menu.href} />
            ))}


        </View>
    );
};


{/* Add A Logout And When It press it delete token form AsynStorage */ }
{/* <TouchableOpacity
                style={{
                    padding: 10,
                    backgroundColor: 'red',
                    borderRadius: 5,
                    alignItems: 'center',
                }}
            onPress={() => {
                AsyncStorage.removeItem('token');
                navigation.navigate('Login');
            }}>
                <Text>Logout</Text>
            </TouchableOpacity> */}

