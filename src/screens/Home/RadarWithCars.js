import React, { useRef, useEffect, useState } from "react";
import {
    View,
    Animated,
    Easing,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Circle, Path, Defs, RadialGradient, Stop, G } from "react-native-svg";
import { useAssignDriverMutation } from "../../context/orderApi";
import CountdownHeader from "../../components/Countdown/CountdownHeader";
import styles from "./styles/WithCars";

const AnimatedG = Animated.createAnimatedComponent(G);
const TAXI_COUNT = 3;
const ICON_SIZE = 30;

// Polar to Cartesian
function polarToCartesian(cx, cy, r, angleDeg) {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// Radar sector
function createSectorPath(cx, cy, r, start, end) {
    const startP = polarToCartesian(cx, cy, r, end);
    const endP = polarToCartesian(cx, cy, r, start);
    const largeArc = end - start <= 180 ? "0" : "1";
    return `M ${cx} ${cy} L ${startP.x} ${startP.y} A ${r} ${r} 0 ${largeArc} 0 ${endP.x} ${endP.y} Z`;
}

// Random taxi positions
function getRandomPositionsInCircle(cx, cy, r, iconSize = ICON_SIZE) {
    const positions = [];
    const iconRadius = iconSize / 2;
    for (let i = 0; i < TAXI_COUNT; i++) {
        let x, y;
        do {
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * (r - iconRadius);
            x = cx + radius * Math.cos(angle);
            y = cy + radius * Math.sin(angle);
        } while (Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) > r - iconRadius);
        positions.push({ x: x - iconRadius, y: y - iconRadius });
    }
    return positions;
}


export default function RadarWithCars({ drivers, clientId, setHasDriver, orderId, size = 340 }) {
    const spin = useRef(new Animated.Value(0)).current;
    const approachAnim = useRef(new Animated.Value(0)).current;
    const [positions, setPositions] = useState([]);
    const [selectedTaxi, setSelectedTaxi] = useState(null);
    const [countdown, setCountdown] = useState(0); // countdown in seconds
    const [loadingIndex, setLoadingIndex] = useState(null);

    const [assignDriver, { isLoading }] = useAssignDriverMutation();

    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 * 0.92;

    // Initial taxi positions
    useEffect(() => {
        setPositions(getRandomPositionsInCircle(cx, cy, r));
    }, []);


    useEffect(() => {
        Animated.loop(
            Animated.timing(spin, {
                toValue: 1,
                duration: 3200,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);


    // Countdown timer
    useEffect(() => {
        if (countdown <= 0) return;
        const interval = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [countdown]);

    // Handle taxi selection
    async function handleSelectTaxi(taxi, index) {

        setLoadingIndex(index);
        try {
            // return
            const res = await assignDriver({
                orderId,
                driverId: taxi.driverId._id,
            }).unwrap();

            setHasDriver("driver");
            if (!res) {
                setLoadingIndex(null);
                return;
            }

            setSelectedTaxi(taxi);
            approachAnim.setValue(0);

            await AsyncStorage.setItem("panding", "true");
            Animated.timing(approachAnim, {
                toValue: 1,
                duration: taxi.eta * 60 * 1000, // ETA in minutes
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();

            setCountdown(taxi.eta * 60); // set countdown in seconds 
        } catch (error) {
            console.error("Failed to assign driver:", error);
        } finally {
            setLoadingIndex(null); // tugagach loader o‘chadi
        }
    }

    const rotate = spin.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });
    const beamPath = createSectorPath(cx, cy, r, -8, 8);

    return (
        <View style={styles.container}>
            {/* Radar Screen */}
            <View style={[styles.radarWrapper, { width: size, height: size }]}>
                <Svg width={size} height={size}>
                    <Defs>
                        <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
                            <Stop offset="0%" stopColor="#00ff7f" stopOpacity="0.15" />
                            <Stop offset="70%" stopColor="#00ff7f" stopOpacity="0.05" />
                            <Stop offset="100%" stopColor="#00ff7f" stopOpacity="0" />
                        </RadialGradient>
                    </Defs>

                    <Circle cx={cx} cy={cy} r={r} fill="#041017" />
                    <Circle cx={cx} cy={cy} r={r} fill="url(#glow)" />

                    {[1, 2, 3, 4].map((i, x) => (
                        <Circle
                            key={x}
                            cx={cx}
                            cy={cy}
                            r={(r / 5) * i}
                            stroke="#00ff7f"
                            strokeOpacity={0.12}
                            strokeWidth={1}
                            fill="none"
                        />
                    ))}

                    <Path
                        d={`M ${cx} ${cy - r} L ${cx} ${cy + r} M ${cx - r} ${cy} L ${cx + r} ${cy}`}
                        stroke="#00ff7f"
                        strokeOpacity={0.1}
                        strokeWidth={1}
                    />

                    <AnimatedG
                        style={{
                            transform: [
                                { translateX: cx },
                                { translateY: cy },
                                { rotate },
                                { translateX: -cx },
                                { translateY: -cy },
                            ],
                        }}
                    >
                        <Path d={beamPath} fill="#00ff7f" fillOpacity={0.23} />
                        <Path d={createSectorPath(cx, cy, r, -2, 2)} fill="#00ff7f" fillOpacity={0.3} />
                    </AnimatedG>
                </Svg>

                {/* Taxis on radar (clickable) */}
                {positions.map((pos, i) => (
                    <TouchableOpacity
                        key={i}
                        style={[styles.taxiIcon, { left: pos.x, top: pos.y }]}
                    >
                        <Image
                            source={require("../../assets/car.png")}
                            style={styles.taxiIcon}
                        />
                    </TouchableOpacity>
                ))}

                <CountdownHeader
                    driversLength={drivers?.length}
                    countdown={countdown}
                    selectedTaxi={selectedTaxi}
                    orderId={orderId}
                />
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                {drivers?.map((taxi, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleSelectTaxi(taxi, index)}
                        disabled={loadingIndex === index}
                    >
                        <View style={[styles.taxiCard, loadingIndex === index && styles.taxiCardLoading]}>
                            <Image
                                source={require("../../assets/car.png")}
                                style={styles.taxiImage}
                            />

                            <View style={{ flex: 1 }}>
                                <Text style={styles.taxiName}>
                                    {/* {taxi?.driverId?.car?.make} {taxi?.driverId?.car?.modelName} */}
                                    {taxi?.driverId?.car?.plateNumber}  -
                                    <Text style={styles.taxiColor}>
                                        {taxi?.driverId?.car?.color}
                                    </Text>
                                </Text>

                                <Text style={styles.driverName}>
                                    Shafyor: {taxi?.driverId?.firstName} {taxi?.driverId?.lastName}
                                </Text>
                            </View>

                            {loadingIndex === index ? (
                                <ActivityIndicator size="small" color="#00ff7f" />
                            ) : (
                                <View>
                                    <Text style={styles.etaText}>
                                        {taxi.distance < 1
                                            ? `${Math.round(taxi.distance * 1000)} m`
                                            : `${taxi.distance} km`}
                                    </Text>
                                    <Text style={styles.etaText}>{taxi.eta} min</Text>
                                </View>

                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>

    );
}