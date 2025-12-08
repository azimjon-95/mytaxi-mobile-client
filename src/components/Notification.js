import { useRef, useEffect, useState } from "react";
import { Animated, Text, StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

let globalShowNotification; // Global funksiya

export function NotificationProvider({ children }) {
    const translateY = useRef(new Animated.Value(-100)).current;
    const [message, setMessage] = useState("");
    const [type, setType] = useState("success");
    const [visible, setVisible] = useState(false);

    const showNotification = (msg, notificationType = "success") => {
        setMessage(msg);
        setType(notificationType);
        setVisible(true);

        Animated.sequence([
            Animated.timing(translateY, {
                toValue: 50, // tepada
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: height / 2 - 50, // o‘rta
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: -100, // yuqoriga ketadi
                duration: 500,
                delay: 1000,
                useNativeDriver: true,
            }),
        ]).start(() => setVisible(false));
    };

    useEffect(() => {
        globalShowNotification = showNotification;
    }, []);

    return (
        <>
            {children}
            {visible && (
                <Animated.View
                    style={[
                        styles.container,
                        {
                            transform: [{ translateY }],
                            backgroundColor: type === "success" ? "#4BB543" : "#FF4D4D",
                        },
                    ]}
                >
                    <Text style={styles.text}>{message}</Text>
                </Animated.View>
            )}
        </>
    );
}

export function Notification(msg, type = "success") {
    if (globalShowNotification) {
        globalShowNotification(msg, type);
    } else {
        console.warn("NotificationProvider topilmadi!");
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 20,
        right: 20,
        padding: 15,
        borderRadius: 10,
        zIndex: 9999,
        elevation: 999,
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
    },
});
