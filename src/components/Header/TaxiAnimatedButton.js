// TaxiAnimatedButton.js
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, Easing, Dimensions, Image } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function TaxiAnimatedButton({
    boxWidth = SCREEN_WIDTH * 0.45, // o'zgartirilgan
    boxHeight = 50,
    carWidth = 80,
    duration = 2000,
    blinkDuration = 300,
}) {
    const translateX = useRef(new Animated.Value(0)).current;
    const headlightOpacity = useRef(new Animated.Value(1)).current;
    const direction = useRef(1); // 1 -> o'ngga, -1 -> chapga
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const range = boxWidth - carWidth - 0;

        const move = () => {
            Animated.timing(translateX, {
                toValue: direction.current === 1 ? range : 0,
                duration: duration,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true,
            }).start(() => {
                direction.current *= -1;
                setScale(direction.current); // rasmni tezda burish
                move(); // animatsiyani davom ettirish
            });
        };

        move();
    }, [boxWidth, carWidth, duration, translateX]);

    // Faralar blink animatsiyasi
    useEffect(() => {
        const blink = Animated.loop(
            Animated.sequence([
                Animated.timing(headlightOpacity, {
                    toValue: 0.15,
                    duration: blinkDuration / 2,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(headlightOpacity, {
                    toValue: 1,
                    duration: blinkDuration / 2,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        );
        blink.start();
        return () => blink.stop();
    }, [headlightOpacity, blinkDuration]);

    return (
        <View style={styles.container}>
            <View
                style={[styles.box, { width: boxWidth - 12, height: boxHeight - 23.5 }]}
            >
                <View style={styles.roadLine} />

                <Animated.View
                    style={[
                        styles.carWrapper,
                        {
                            transform: [{ translateX }, { scaleX: scale }], // tezda buriladigan rasm
                            top: (boxHeight - 55) / 2,
                            width: carWidth,
                        },
                    ]}
                >
                    <Image
                        source={require("../../assets/cars/ekanom.png")}
                        style={{ width: carWidth, height: 30, resizeMode: "contain" }}
                    />
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: "center" },
    box: {
        right: 13,
        height: 30,
        overflow: "hidden",
        justifyContent: "center",
    },
    roadLine: {
        position: "absolute",
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: "rgb(0, 255, 127)",
        bottom: 4,
        // marginHorizontal: 8,
        borderRadius: 2,
    },
    carWrapper: {
        position: "absolute",
        width: 60,
        height: 30,
    },
});
