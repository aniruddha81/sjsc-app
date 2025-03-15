import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const Header = () => {
    const navigation = useNavigation();
    const goProfile = () => {
        navigation.navigate('Profile');
    };
    return (
        <View style={styles.header}>
            {/* Center Image */}
            <View style={{
                flex: 1, flexDirection: "row", alignItems: "center", gap: 10
            }}>
                <Image source={require('../assets/sjsc.png')} style={{ width: 60, height: 60 }} />
                <View>
                    <Text style={{
                        fontWeight: "bold"
                    }}>
                        St. Joseph's School & College
                    </Text>
                    <Text>
                        Bonpara, Natore
                    </Text>
                </View>
            </View>

            {/* Right-end Image with Text (User) */}
            <TouchableOpacity
                onPress={() => goProfile()}
                 style={{
                flex: "row", alignItems: "center", justifyContent: "space-between"
            }}>
                <Image source={{ uri: "https://assets.chorcha.net/ZUfPUPHLvDxY_yOveJGZm.png" }}
                    style={{ width: 30, height: 30, borderRadius: 50, }}
                />
               
            </TouchableOpacity>
        </View>

    );
};


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        height: 160,
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        // backgroundColor: '#0f0c29'
    },
    text: {
        // color: '#fff',
        fontSize: 20,
        textAlign: 'left',
        maxWidth: 260,
        fontWeight: 'bold',
    }
});

export default Header;