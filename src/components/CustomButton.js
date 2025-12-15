import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CustomButton({
    title,
    onPress,
    bg = "rgb(0, 255, 127)",
    color = "#000",
    full = false,
    style = {},
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.6}
            style={[
                styles.button,
                { backgroundColor: bg, width: full ? "100%" : "auto" },
                style,
            ]}
        >
            <Text style={[styles.text, { color }]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: "700",
    },
});
