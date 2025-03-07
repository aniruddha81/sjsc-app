import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <Image source={require('../assets/sjsc.png')} style={{ width: 50, height: 50 }} />
            <View>
                <Text style={styles.text}>St. Joseph's School and College</Text>
                <Text style={{ color: "white" }}>Bonpara, Natore.</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 10,
        height: 160,
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#0f0c29'
    },
    text: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'left',
        maxWidth: 260,
        fontWeight: 'bold',
    }
});

export default Header;