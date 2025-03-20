import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window"); // Get device screen width

export function MarqueeText ({ text }){
    const animatedValue = useRef(new Animated.Value(width)).current;

    useEffect(() => {
        const startAnimation = () => {
            animatedValue.setValue(width);
            Animated.timing(animatedValue, {
                toValue: -text.length * 12, // Moves text off-screen
                duration: 5000, // Adjust speed by changing duration
                useNativeDriver: true,
            }).start(startAnimation); // Restart animation infinitely
        };

        startAnimation();
    }, [animatedValue]);

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.marqueeText, { transform: [{ translateX: animatedValue }] }]}>
                {text}
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#000",
        paddingVertical: 15,
    },
    marqueeText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        position: "absolute",
        whiteSpace: "nowrap", // Prevent line breaks
    },
});
