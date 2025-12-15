import React, { useRef, useEffect, useState } from "react";
import {
    View,
    Animated,
    Easing,
    Image,
    Text,
    Linking,
    TouchableOpacity,
} from "react-native";
import Svg, { Circle, Path, Defs, RadialGradient, Stop, G } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/TaxiTracker";
import LicensePlate from "../../components/LicensePlate/LicensePlate";

const AnimatedG = Animated.createAnimatedComponent(G);
const ICON_SIZE = 30;

// Polar coordinate helper
function polarToCartesian(cx, cy, r, angleDeg) {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// Create sector path
function createSectorPath(cx, cy, r, start, end) {
    const startP = polarToCartesian(cx, cy, r, end);
    const endP = polarToCartesian(cx, cy, r, start);
    const largeArc = end - start <= 180 ? "0" : "1";
    return `M ${cx} ${cy} L ${startP.x} ${startP.y} A ${r} ${r} 0 ${largeArc} 0 ${endP.x} ${endP.y} Z`;
}

// LocalStorage helpers
async function saveETA(driverId, etaMinutes) {
    const endTime = Date.now() + etaMinutes * 60 * 1000;
    await AsyncStorage.setItem(`eta_${driverId}`, String(endTime));
}

async function loadETA(driverId) {
    const endTime = await AsyncStorage.getItem(`eta_${driverId}`);
    if (!endTime) return null;
    const diff = Math.floor((endTime - Date.now()) / 1000);
    return diff > 0 ? diff : 0;
}

export default function ActiveTaxiTracker({ drivers, size = 340 }) {
    const spin = useRef(new Animated.Value(0)).current;
    const [approachStart, setApproachStart] = useState(null);
    const [countdown, setCountdown] = useState(0);

    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 * 0.92;

    // Radar rotation
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

    // Load or save ETA
    useEffect(() => {
        if (!drivers) return;

        (async () => {
            const stored = await loadETA(drivers.driverId);
            if (stored && stored > 0) {
                setCountdown(stored); // continue existing countdown
            } else {
                await saveETA(drivers.driverId, drivers.eta);
                setCountdown(drivers.eta * 60);
            }
        })();
    }, [drivers]);

    // Countdown timer
    useEffect(() => {
        if (countdown <= 0) return;
        const interval = setInterval(() => {
            setCountdown((t) => (t > 0 ? t - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [countdown]);

    // Taxi starting point at random angle
    useEffect(() => {
        const angle = Math.random() * 360;
        const start = polarToCartesian(cx, cy, r - 20, angle);
        setApproachStart(start);
    }, []);

    // Animate taxi towards center
    const carX = useRef(new Animated.Value(approachStart?.x || cx)).current;
    const carY = useRef(new Animated.Value(approachStart?.y || cy)).current;

    useEffect(() => {
        if (!approachStart || countdown <= 0) return;

        const clampToCircle = (px, py) => {
            const dx = px - cx;
            const dy = py - cy;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= r) return { x: px, y: py };
            const k = r / distance;
            return { x: cx + dx * k, y: cy + dy * k };
        };

        const startPos = clampToCircle(approachStart.x, approachStart.y);
        carX.setValue(startPos.x);
        carY.setValue(startPos.y);

        Animated.parallel([
            Animated.timing(carX, {
                toValue: cx,
                duration: countdown * 1000,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: false,
            }),
            Animated.timing(carY, {
                toValue: cy,
                duration: countdown * 1000,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: false,
            }),
        ]).start();
    }, [approachStart, countdown]);

    const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
    const beamPath = createSectorPath(cx, cy, r, -8, 8);

    return (
        <View style={{ flex: 1 }}>
            {/* Radar */}
            <View style={[styles.radarContainer, { width: size, height: size }]}>
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

                    {[1, 2, 3, 4].map((i) => (
                        <Circle
                            key={i}
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
                        <Path
                            d={createSectorPath(cx, cy, r, -2, 2)}
                            fill="#00ff7f"
                            fillOpacity={0.3}
                        />
                    </AnimatedG>
                </Svg>

                {/* Taxi inside radar */}
                {approachStart && (
                    <Animated.View
                        style={{
                            position: "absolute",
                            left: carX,
                            top: carY,
                            transform: [
                                { translateX: -(ICON_SIZE / 2) },
                                { translateY: -(ICON_SIZE / 2) },
                            ],
                        }}
                    >
                        <Image
                            source={require("../../assets/car.png")}
                            style={{ width: ICON_SIZE + 12, height: ICON_SIZE + 12 }}
                        />
                    </Animated.View>
                )}
            </View>

            {/* Taxi Information */}
            <View style={styles.taxiInfoContainer}>
                <Text style={styles.taxiName}>
                    {drivers?.driverInfo?.car?.make} {drivers?.driverInfo?.car?.modelName}
                </Text>

                <LicensePlate
                    number={drivers?.driverInfo?.car?.plateNumber}
                    size="medium"
                />

                <Text style={styles.taxiColor}>Rangi: {drivers?.color}</Text>
                <Text style={styles.taxiDriver}>
                    Haydovchi: {drivers?.driverInfo.firstName}{" "}
                    {drivers?.driverInfo.lastName}
                </Text>

                <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${drivers?.driverInfo?.phoneNumber}`)}
                >
                    <Text style={styles.taxiPhone}>
                        Telefon: {drivers?.driverInfo?.phoneNumber}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.taxiETA}>
                    {countdown > 0
                        ? `${Math.floor(countdown / 60)} min ${countdown % 60} s da yetib keladi...`
                        : "Taksi yetib keldi!"}
                </Text>
            </View>
        </View>
    );
}
