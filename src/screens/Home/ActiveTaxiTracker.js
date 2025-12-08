import React, { useRef, useEffect, useState } from "react";
import {
    View,
    Animated,
    Easing,
    Image,
    Text,
    Linking, TouchableOpacity,
} from "react-native";
import Svg, { Circle, Path, Defs, RadialGradient, Stop, G } from "react-native-svg";
import styles from "./styles/TaxiTracker";
import LicensePlate from "../../components/LicensePlate/LicensePlate";


const AnimatedG = Animated.createAnimatedComponent(G);
const ICON_SIZE = 30;

function polarToCartesian(cx, cy, r, angleDeg) {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function createSectorPath(cx, cy, r, start, end) {
    const startP = polarToCartesian(cx, cy, r, end);
    const endP = polarToCartesian(cx, cy, r, start);
    const largeArc = end - start <= 180 ? "0" : "1";
    return `M ${cx} ${cy} L ${startP.x} ${startP.y} A ${r} ${r} 0 ${largeArc} 0 ${endP.x} ${endP.y} Z`;
}


export default function ActiveTaxiTracker({ drivers, clientId, orderId, size = 340 }) {
    const spin = useRef(new Animated.Value(0)).current;
    const approachAnim = useRef(new Animated.Value(0)).current;


    const [approachStart, setApproachStart] = useState(null);
    const [approachPos, setApproachPos] = useState(null);
    const [countdown, setCountdown] = useState(0);

    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 * 0.92;

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

    useEffect(() => {
        if (!approachStart) return;
        const id = approachAnim.addListener(({ value }) => {
            const x = approachStart.x + (cx - ICON_SIZE / 2 - approachStart.x) * value;
            const y = approachStart.y + (cy - ICON_SIZE / 2 - approachStart.y) * value;
            setApproachPos({ x, y });
        });
        return () => approachAnim.removeListener(id);
    }, [approachStart]);

    useEffect(() => {
        if (countdown <= 0) return;
        const interval = setInterval(() => setCountdown((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
        return () => clearInterval(interval);
    }, [countdown]);


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
                        <Circle key={i} cx={cx} cy={cy} r={(r / 5) * i} stroke="#00ff7f" strokeOpacity={0.12} strokeWidth={1} fill="none" />
                    ))}
                    <Path d={`M ${cx} ${cy - r} L ${cx} ${cy + r} M ${cx - r} ${cy} L ${cx + r} ${cy}`} stroke="#00ff7f" strokeOpacity={0.1} strokeWidth={1} />
                    <AnimatedG style={{ transform: [{ translateX: cx }, { translateY: cy }, { rotate }, { translateX: -cx }, { translateY: -cy }] }}>
                        <Path d={beamPath} fill="#00ff7f" fillOpacity={0.23} />
                        <Path d={createSectorPath(cx, cy, r, -2, 2)} fill="#00ff7f" fillOpacity={0.3} />
                    </AnimatedG>
                </Svg>

                {/* Taxi approach */}
                {approachPos && (
                    <Animated.View style={[styles.taxiApproach, { left: approachPos.x, top: approachPos.y }]}>
                        <Image source={require("../../assets/taxi.png")} style={{ width: ICON_SIZE + 12, height: ICON_SIZE + 12 }} />
                    </Animated.View>
                )}


            </View>


            {/* Taxi Info (always visible) */}
            <View style={styles.taxiInfoContainer}>
                <Text style={styles.taxiName}>{drivers?.driverInfo?.car?.make} {drivers?.driverInfo?.car?.modelName} </Text>
                {/* <Text style={styles.taxiName}>{drivers?.driverInfo?.car?.plateNumber} </Text> */}
                <LicensePlate number={drivers?.driverInfo?.car?.plateNumber} size="medium" />
                <Text style={styles.taxiColor}>Rangi: {drivers?.color}</Text>
                <Text style={styles.taxiDriver}>Haydovchi: {drivers?.driverInfo.firstName} {drivers?.driverInfo.lastName}</Text>
                <TouchableOpacity
                    onPress={() => {
                        const phone = drivers?.driverInfo?.phoneNumber;
                        if (phone) {
                            Linking.openURL(`tel:${phone}`);
                        }
                    }}
                >
                    <Text style={styles.taxiPhone}>
                        Telefon: {drivers?.driverInfo?.phoneNumber}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.taxiETA}>
                    {drivers?.eta > 0 ? `${Math.floor(countdown / 60)} min ${countdown % 60} s da yetib keladi...` : "Taksi kutilyapti..."}
                </Text>
            </View>

        </View>
    );
}
