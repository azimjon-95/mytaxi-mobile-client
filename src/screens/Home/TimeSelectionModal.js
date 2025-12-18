import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    Modal,
    Pressable,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    Dimensions,
    FlatList,
    Image,
    Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import * as Location from "expo-location";
import { setActiveOrder, setOrderLoading } from "../../context/actions/orderSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCreateOrderMutation } from "../../context/orderApi";
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from "dayjs";
import styles from "./styles/SliderStyles";
import { Notification } from "../../components/Notification";
import { useGetServicesQuery, useGetCarTypesQuery } from "../../context/configApi";

// 🔥 Conditional import for native platforms only
// let MapView, Marker, PROVIDER_GOOGLE;
// if (Platform.OS !== 'web') {
//     const Maps = require('react-native-maps');
//     MapView = Maps.default;
//     Marker = Maps.Marker;
//     PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
// }

const TimeSelectionModal = ({ visible, onClose, setTimeSelected, setHasDriver }) => {
    const dispatch = useDispatch();
    const timeOptions = [{ label: "Chaqirish", value: "waiting" }];
    const [selectedService, setSelectedService] = useState(null);
    const [selectedCar, setSelectedCar] = useState("econom");
    const [selectedTime, setSelectedTime] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [destination, setDestination] = useState("");
    const mapRef = useRef(null);
    const { width } = Dimensions.get("window");

    const { data: carTypes } = useGetCarTypesQuery();
    const { data: services } = useGetServicesQuery();
    const [createOrder, { isLoading }] = useCreateOrderMutation();

    // 🔹 DEFAULT CAR
    useEffect(() => {
        if (carTypes?.message?.length) {
            setSelectedCar("econom");
        }
    }, [carTypes]);

    // 🔹 GET USER LOCATION
    useEffect(() => {
        if (visible) getUserLocation();
    }, [visible]);

    const getUserLocation = async () => {
        try {
            setLoadingLocation(true);
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Notification("Location ruxsat berilmadi", "error");
                setLoadingLocation(false);
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            setUserLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
            });
            setLoadingLocation(false);
        } catch (error) {
            console.error("Location error:", error);
            Notification("Location olishda xatolik", "error");
            setLoadingLocation(false);
        }
    };

    // 🔹 SEND ORDER
    const sendOrder = async (timeOption) => {
        setSelectedTime(timeOption.label);
        dispatch(setOrderLoading(true));

        try {
            const userJson = await AsyncStorage.getItem("userData");
            const user = userJson ? JSON.parse(userJson) : null;
            if (!user) {
                Notification("Foydalanuvchi ma'lumotlari topilmadi", "error");
                setSelectedTime(null);
                return;
            }

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Notification("Location ruxsat berilmadi", "error");
                setSelectedTime(null);
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            };

            const orderPrice = Math.floor(Math.random() * 30000) + 15000;
            const orderCashback = Math.floor(orderPrice * 0.1);

            const orderTime = dayjs().format("HH:mm");

            const newOrder = {
                clientId: user?._id,
                date: dayjs().format("YYYY-MM-DD"),
                time: orderTime,
                from: user.address,
                to: destination || "Manzil " + Math.floor(Math.random() * 100),
                price: orderPrice,
                cashback: orderCashback,
                when: timeOption.value,
                location: coords,
                phoneId: user.phone,
                carType: carTypes?.message?.find(c => c.value === selectedCar)
                    ? {
                        carTypeId: carTypes.message.find(c => c.value === selectedCar)._id,
                        label: carTypes.message.find(c => c.value === selectedCar).label,
                        price: carTypes.message.find(c => c.value === selectedCar).price,
                    }
                    : null,
                service: selectedService
                    ? {
                        serviceId: selectedService._id,
                        name: selectedService.value,
                        price: selectedService.price
                    }
                    : null,
            };

            const response = await createOrder(newOrder).unwrap();
            setHasDriver("availableDrivers");

            await AsyncStorage.setItem(
                "activeOrderStatus",
                JSON.stringify({ status: true, order: response?.innerData })
            );

            dispatch(setActiveOrder(response?.innerData));
            setTimeSelected(true);
            Notification("Buyurtma muvaffaqiyatli yaratildi", "success");

        } catch (e) {
            Notification(`Buyurtma yuborishda xatolik: ${e?.data?.message || e.message}`, "error");
            setSelectedTime(null);
        } finally {
            setSelectedTime(null);
            dispatch(setOrderLoading(false));
            onClose();
        }
    };

    // 🔹 MAP ANIMATION
    useEffect(() => {
        if (mapRef.current && userLocation) {
            mapRef.current.animateToRegion({
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
            }, 1000);
        }
    }, [userLocation]);

    // 🔹 RENDER MAP
    const renderMap = () => {
        if (loadingLocation) {
            return (
                <View style={styles.mapLoading}>
                    <ActivityIndicator size="large" color="#4A90E2" />
                    <Text style={styles.mapLoadingText}>Joylashuv aniqlanmoqda...</Text>
                </View>
            );
        }

        if (!userLocation) {
            return (
                <View style={styles.mapError}>
                    <Text style={styles.mapErrorText}>Xarita yuklanmadi</Text>
                </View>
            );
        }

        // if (Platform.OS === 'web') {
        const { latitude, longitude } = userLocation;
        return (
            <View style={styles.webLocationInfo}>
                <iframe
                    src={`https://yandex.uz/map-widget/v1/?ll=${longitude}%2C${latitude}&z=16&l=map&pt=${longitude},${latitude},pm2rdm`}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 0,
                        borderRadius: 15,
                    }}
                    allowFullScreen
                    loading="lazy"
                />
            </View>
        );
        // }

        return (
            <View style={styles.webLocationInfo}>
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                        latitudeDelta: 0.007,
                        longitudeDelta: 0.007,
                    }}
                    showsMyLocationButton={true}
                    showsUserLocation={false}
                    loadingEnabled={true}
                    mapType="standard"
                >
                    <Marker
                        coordinate={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                        }}
                        title="Sizning joylashuvingiz"
                        description="Taksi shu yerga keladi"
                    >
                        <Image
                            source={require("../../assets/you.png")}
                            style={{
                                width: 35,
                                height: 35,
                                resizeMode: "contain",
                                marginBottom: 10,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                shadowRadius: 2,
                                elevation: 5,
                            }}
                        />
                    </Marker>
                </MapView>
            </View>
        );
    };

    // 🔹 RENDER CAR TYPES
    const renderCarTypes = () => (
        <FlatList
            data={carTypes?.message?.filter(c => c.isActive)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingVertical: 5 }}
            renderItem={({ item }) => {
                const active = selectedCar === item.value;
                return (
                    <TouchableOpacity
                        onPress={() => setSelectedCar(item.value)}
                        style={[styles.card, active && styles.activeCard]}
                    >
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={[styles.label, active && styles.activeLabel]}>
                            {item.label}
                        </Text>
                        {/* <Text style={styles.priceText}>+{item.price.toLocaleString()} so‘m</Text> */}
                    </TouchableOpacity>
                );
            }}
        />
    );

    // 🔹 RENDER SERVICES
    const renderServices = () => (
        <FlatList
            data={services?.message}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 10 }}
            renderItem={({ item }) => {
                const isSelected = selectedService?._id === item._id;
                return (
                    <TouchableOpacity
                        onPress={() => setSelectedService(isSelected ? null : item)}
                        style={[styles.picker_li, isSelected && styles.activeCard_li]}
                    >
                        <Text style={[styles.serviceText_li, isSelected && styles.activeLabel_li]}>
                            {item.value}
                        </Text>
                        <Text style={[styles.priceText_li, isSelected && styles.activeLabel_li]}>
                            {item.price.toLocaleString()} so‘m
                        </Text>
                    </TouchableOpacity>
                );
            }}
        />
    );

    return (
        <Modal animationType="slide" transparent visible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalBox}>
                    {/* MAP */}
                    <View style={styles.mapContainer}>{renderMap()}</View>

                    {/* CAR TYPES */}
                    <Text style={[styles.modalTitle, { marginTop: 10 }]}>Taksi turi</Text>
                    {renderCarTypes()}

                    {/* SERVICES */}
                    <Text style={[styles.modalTitle, { marginTop: 10 }]}>Qo'shimcha xizmatlar</Text>
                    {renderServices()}

                    {/* DESTINATION INPUT */}
                    <View style={styles.timeContainer}>
                        <TextInput
                            style={{
                                height: 45,
                                flex: 1,
                                borderColor: "#ffffff",
                                borderWidth: 1,
                                color: "#c79393d4",
                                borderRadius: 8,
                                paddingHorizontal: 10,
                                marginBottom: 10,
                            }}
                            placeholder="Qayerga bormoqchisiz yoki maqsadingiz? (Yozing...)"
                            value={destination}
                            onChangeText={setDestination}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>

                    {/* TIME BUTTONS + CANCEL */}
                    <View style={styles.timeContainer}>
                        <Pressable
                            style={[styles.cancelBtn, selectedTime && { opacity: 0.6 }]}
                            onPress={onClose}
                            disabled={!!selectedTime}
                        >
                            <Icon name="close" size={25} color="#ff3b3b" />
                        </Pressable>

                        {timeOptions.map((t, i) => (
                            <Pressable
                                key={i}
                                style={[styles.timeBtn, selectedTime && selectedTime !== t.label && { opacity: 0.6 }]}
                                onPress={() => sendOrder(t)}
                                disabled={!!selectedTime}
                            >
                                {selectedTime === t.label && isLoading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.timeBtnText}>{t.label}</Text>
                                )}
                            </Pressable>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default TimeSelectionModal;