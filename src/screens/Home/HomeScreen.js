import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Easing,
    Image,
    Linking
} from "react-native";
import TimeSelectionModal from "./TimeSelectionModal";
import { Notification } from "../../components/Notification";
import styles from "./styles/Home";

export default function HomeScreen({ navigation, setHasDriver }) {
    const [modalVisible, setModalVisible] = useState(false);

    const TAXI_PHONE = "8080";

    // --- EXISTING ANIMATION VALUES ---
    const titleAnim = useRef(new Animated.Value(0)).current;
    const titleRotate = useRef(new Animated.Value(0)).current;
    const taxiBounce = useRef(new Animated.Value(0)).current;
    const taxiTrail = useRef(new Animated.Value(0)).current;
    const callBounce = useRef(new Animated.Value(80)).current;
    const infoWave = useRef(new Animated.Value(0)).current;

    // --- NEW TAXI IMAGE ANIMATION ---
    const taxiMove = useRef(new Animated.Value(0)).current;
    const taxiShake = useRef(new Animated.Value(0)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;
    const trailAnim = useRef(new Animated.Value(0)).current;
    const translateX = taxiMove.interpolate({
        inputRange: [0, 1],
        outputRange: [-180, 400]
    });
    useEffect(() => {
        // Title 3D + blur remove
        Animated.parallel([
            Animated.timing(titleAnim, {
                toValue: 1,
                duration: 900,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true
            }),
            Animated.timing(titleRotate, {
                toValue: 1,
                duration: 900,
                easing: Easing.out(Easing.back(2)),
                useNativeDriver: true
            })
        ]).start();

        // Taxi bounce + trail
        Animated.sequence([
            Animated.timing(taxiBounce, {
                toValue: -15,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true
            }),
            Animated.timing(taxiBounce, {
                toValue: 0,
                duration: 300,
                easing: Easing.bounce,
                useNativeDriver: true
            }),
        ]).start();

        Animated.timing(taxiTrail, {
            toValue: 1,
            duration: 700,
            easing: Easing.out(Easing.sin),
            useNativeDriver: true
        }).start();

        // Call Button bounce up
        Animated.spring(callBounce, {
            toValue: 0,
            friction: 4,
            tension: 80,
            useNativeDriver: true
        }).start();

        // Info wave effect
        Animated.timing(infoWave, {
            toValue: 1,
            duration: 1000,
            easing: Easing.elastic(1.2),
            useNativeDriver: true
        }).start();

        // --- TAXI IMAGE ANIMATIONS ---
        Animated.timing(taxiMove, {
            toValue: 1,
            duration: 3900,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true
        }).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(taxiShake, {
                    toValue: 3,
                    duration: 120,
                    easing: Easing.linear,
                    useNativeDriver: true
                }),
                Animated.timing(taxiShake, {
                    toValue: -3,
                    duration: 120,
                    easing: Easing.linear,
                    useNativeDriver: true
                }),
                Animated.timing(taxiShake, {
                    toValue: 0,
                    duration: 120,
                    easing: Easing.linear,
                    useNativeDriver: true
                })
            ]),
            { iterations: 10 }
        ).start();

        Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1800,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true
        }).start();

        Animated.timing(trailAnim, {
            toValue: 1,
            duration: 1800,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true
        }).start();

    }, []);

    const makePhoneCall = () => {
        Notification(`📞 ${TAXI_PHONE} raqamiga qo'ng'iroq qilindi`, "success");
        const phoneUrl = `tel:${TAXI_PHONE}`;
        Linking.openURL(phoneUrl);
    };


    return (
        <View style={styles.container}>
            {/* TITLE */}
            <Animated.Text

                style={[
                    styles.title,
                    {
                        opacity: titleAnim,
                        transform: [
                            {
                                rotateX: titleRotate.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ["85deg", "0deg"]
                                })
                            },
                            {
                                scale: titleAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.6, 1]
                                })
                            }
                        ]
                    }
                ]}
            >
                Go Taxi
            </Animated.Text>

            {/* ORDER BUTTON */}
            <TouchableOpacity
                style={styles.orderBtn}
                onPress={() => setModalVisible(true)}
            >
                <Animated.Image
                    source={require("../../assets/cars/ekanom.png")}
                    style={{
                        width: 160,
                        height: 90,
                        position: "absolute",
                        top: -11,
                        left: 0,
                        transform: [{ translateX }]
                    }}
                    resizeMode="contain"
                />
                <Text style={styles.orderBtnText}>📱 Buyurtma berish</Text>
            </TouchableOpacity>

            {/* INFO SECTION */}
            <View style={styles.infoSection}>

                <Animated.View style={{ transform: [{ translateY: callBounce }] }}>
                    <TouchableOpacity style={styles.callBtn} onPress={makePhoneCall}>
                        <Text style={styles.callBtnText}>📞 {TAXI_PHONE} ga qo'ng'iroq qilish</Text>
                        <Text style={styles.callBtnSubtext}>Operator bilan to'g'ridan-to'g'ri</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View
                    style={{
                        transform: [
                            {
                                translateX: infoWave.interpolate({
                                    inputRange: [0, 0.25, 0.5, 0.75, 1],
                                    outputRange: [0, -12, 8, -4, 0]
                                })
                            }
                        ]
                    }}
                >
                    <View style={styles.infoBox}>
                        <Text style={styles.infoTitle}>🚖 Go Taxi xizmatlari:</Text>
                        <Text style={styles.infoText}>• Tez va ishonchli xizmat</Text>
                        <Text style={styles.infoText}>• Har bir buyurtmadan 700 so'm keshbekk</Text>
                        <Text style={styles.infoText}>• 24/7 operatorlar xizmati</Text>
                        <Text style={styles.infoText}>• Qulay narxlar</Text>
                    </View>
                </Animated.View>

            </View>

            <TimeSelectionModal
                visible={modalVisible}
                setHasDriver={setHasDriver}
                onClose={() => setModalVisible(false)}
            />

        </View>
    );
}
