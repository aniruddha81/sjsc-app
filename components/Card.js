import React from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


const Card = ({ item, icon, href }) => {
    const navigation = useNavigation();
    
    return (
        <TouchableOpacity
        onPress={() => navigation.navigate(href)}
         style={styles.card}>
            <Icon
                name={icon}
                color='#302b63'
                size={50}
            />
            {/* <FontAwesome name="pencil" size={50} color="green" />  */}
            <Text style={styles.cardTitle}>{item}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DBDBDB',
        shadowColor: '#000',
        width: 150,
        margin: 5,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#302b63',
        marginTop: 10,
    }
});

export default Card;