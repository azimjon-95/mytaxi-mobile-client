import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";

export default function HomeScreen() {
    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null);

    // 1️⃣ Location olish
    const getCurrentLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Xatolik", "Location ruxsat berilmadi");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setStartLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            // Misol uchun endLocation
            setEndLocation({
                latitude: location.coords.latitude + 0.09, // biroz masofa
                longitude: location.coords.longitude + 0.09,
            });
        } catch (error) {
            Alert.alert("Xatolik", error.message);
        }
    };

    // 2️⃣ OSRM orqali route olish
    const getRouteInfo = async () => {
        if (!startLocation || !endLocation) {
            Alert.alert("Xatolik", "Locationlar topilmadi");
            return;
        }

        try {
            const url = `https://router.project-osrm.org/route/v1/driving/${startLocation.longitude},${startLocation.latitude};${endLocation.longitude},${endLocation.latitude}?overview=false`;
            const response = await fetch(url);
            const data = await response.json();


            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0];
                setRouteInfo({
                    distance: (route.distance / 1000).toFixed(1) + " km",
                    duration: Math.round(route.duration / 60) + " daqiqa",
                    via: "R-121 orqali", // OSRM real yo‘l nomlarini bermaydi, shunchaki placeholder
                });
            } else {
                Alert.alert("Xatolik", "Yo‘l topilmadi");
            }
        } catch (error) {
            Alert.alert("Xatolik", error.message);
        }
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Yo‘l Ma’lumotlari</Text>

            <TouchableOpacity style={styles.btn} onPress={getRouteInfo}>
                <Text style={styles.btnText}>Yo‘lni Hisoblash</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 20 }}>
                <Text>
                    Start:{" "}
                    {startLocation
                        ? `${startLocation.latitude}, ${startLocation.longitude}`
                        : "Loading..."}
                </Text>
                <Text>
                    Destination:{" "}
                    {endLocation
                        ? `${endLocation.latitude}, ${endLocation.longitude}`
                        : "Loading..."}
                </Text>

                {routeInfo && (
                    <>
                        <Text>Distance: {routeInfo.distance}</Text>
                        <Text>Duration: {routeInfo.duration}</Text>
                        <Text>Via: {routeInfo.via}</Text>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
    btn: { backgroundColor: "blue", paddingVertical: 15, paddingHorizontal: 30, borderRadius: 10 },
    btnText: { color: "#fff", fontSize: 16 },
});
