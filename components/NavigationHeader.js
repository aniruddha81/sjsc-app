import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const NavigationHeader = ({ title, navigate }) => {
    const navigation = useNavigation();

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3
        }}>
            <TouchableOpacity onPress={() => navigation.navigate(navigate)} style={{ marginRight: 10 }}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
        </View>
    );
};

export default NavigationHeader;
