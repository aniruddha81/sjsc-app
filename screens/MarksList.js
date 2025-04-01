import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MarksList from '../components/MarksList';

export default function MarksLists() {
    const navigation = useNavigation();

    return (
        <MarksList navigation={navigation} />

    )
};
