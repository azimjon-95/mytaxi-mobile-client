import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    Pressable,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import { useDispatch } from "react-redux";
import * as Location from "expo-location";
import { setActiveOrder, setOrderLoading } from "../../context/actions/orderSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCreateOrderMutation } from "../../context/orderApi";

import dayjs from "dayjs";
import styles from "./styles/SliderStyles";
import { Notification } from "../../components/Notification";

const carTypes = [
    {
        label: "Ekanom",
        value: "econom",
        image: require("../../assets/cars/ekanom.png"),
    },
    {
        label: "Komfort",
        value: "comfort",
        image: require("../../assets/cars/kamfort.png"),
    },
    {
        label: "Damas",
        value: "damas",
        image: require("../../assets/cars/damas.png"),
    },
    {
        label: "Labo",
        value: "labo",
        image: require("../../assets/cars/04.png"),
    },
];

const TimeSelectionModal = ({ visible, onClose, setTimeSelected, setHasDriver }) => {
    const dispatch = useDispatch();
    const timeOptions = [
        { label: "Chaqirish", value: "waiting" },
        // { label: "Hozir", value: "waiting" },
        // { label: 15, value: "created" },
        // { label: 25, value: "created" },
        // { label: 1, value: "created" }, // 1 soat
    ];
    const [selectedService, setSelectedService] = useState(null);
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedCar, setSelectedCar] = useState("econom"); // DEFAULT EKANOM



    const sendOrder = async (timeOption) => {
        setSelectedTime(timeOption.label);
        dispatch(setOrderLoading(true)); // 🔥 loading = true

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

            let orderTime = dayjs();
            if (timeOption.value === "created") {
                if (timeOption.label === 1) {
                    orderTime = orderTime.add(1, "hour");
                } else {
                    orderTime = orderTime.add(timeOption.label, "minute");
                }
            }
            const formattedTime = orderTime.format("HH:mm");

            const newOrder = {
                id: Date.now(),
                clientId: user?._id,
                date: dayjs().format("YYYY-MM-DD"),
                time: formattedTime,
                from: user.address,
                to: "Manzil " + Math.floor(Math.random() * 100),
                price: orderPrice,
                cashback: orderCashback,
                when: timeOption.value,
                location: coords,
                phoneId: user.phone,
                carType: selectedCar,
                service: selectedService
            };

            const response = await createOrder(newOrder).unwrap();
            console.log(response);
            setHasDriver("availableDrivers");
            await AsyncStorage.setItem(
                "activeOrderStatus",
                JSON.stringify({
                    status: true, order: response?.innerData
                })
            );

            dispatch(setActiveOrder(response?.innerData));
            setTimeSelected(true);
            Notification("Buyurtma muvaffaqiyatli yaratildi", "success");

        } catch (e) {
            Notification(`Buyurtma yuborishda xatolik: ${e?.data.message}`, "error");
            setSelectedTime(null);
        } finally {
            setSelectedTime(null);
            dispatch(setOrderLoading(false)); // 🔥 loading = false
            onClose();
        }
    };

    return (
        <Modal animationType="slide" transparent visible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalBox}>

                    <Text style={styles.modalTitle}>Taksi turi</Text>


                    {/* 🔥 CAR TYPE SLIDER */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    // style={{ marginTop: 15 }}
                    >
                        {carTypes.map((car, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedCar(car.value)}
                                style={[
                                    styles.card,
                                    selectedCar === car.value && styles.activeCard,
                                ]}
                            >
                                <Image source={car.image} style={styles.image} />
                                <Text
                                    style={[
                                        styles.label,
                                        selectedCar === car.value && styles.activeLabel,
                                    ]}
                                >
                                    {car.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Text style={[styles.modalTitle, { marginTop: 10 }]}>Qachon taksi kelsin?</Text>
                    {/* TIME BUTTONS */}
                    {timeOptions.map((t, i) => (
                        <Pressable
                            key={i}
                            style={[
                                styles.timeBtn,
                                selectedTime && selectedTime !== t.label && { opacity: 0.6 }
                            ]}
                            onPress={() => sendOrder(t)}
                            disabled={!!selectedTime}
                        >
                            {selectedTime === t.label && isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.timeBtnText}>
                                    {t.value === "created" && t.label === 1
                                        ? "1 soat"
                                        : t.value === "created"
                                            ? `${t.label} minut`
                                            : t.label}
                                </Text>
                            )}
                        </Pressable>
                    ))}

                    {/* 🔥 Qo‘shimcha xizmatlar: faqat EKONOM bo'lsa ko'rinadi */}
                    {selectedCar === "econom" && (
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={[
                                    styles.serviceBtn,
                                    selectedService === "perimichka" && styles.activeService
                                ]}
                                onPress={() =>
                                    setSelectedService(selectedService === "perimichka" ? null : "perimichka")
                                }
                            >
                                <Text
                                    style={[
                                        styles.serviceLabel,
                                        selectedService === "perimichka" && styles.activeLabel
                                    ]}
                                >
                                    Perimichka
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.serviceBtn,
                                    selectedService === "shatak" && styles.activeService
                                ]}
                                onPress={() =>
                                    setSelectedService(selectedService === "shatak" ? null : "shatak")
                                }
                            >
                                <Text
                                    style={[
                                        styles.serviceLabel,
                                        selectedService === "shatak" && styles.activeLabel
                                    ]}
                                >
                                    Shatak
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {/* CANCEL BUTTON */}
                    <Pressable
                        style={[styles.timeBtn, styles.cancelBtn, selectedTime && { opacity: 0.6 }]}
                        onPress={onClose}
                        disabled={!!selectedTime}
                    >
                        <Text style={styles.cancelBtnText}>Bekor qilish</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default TimeSelectionModal;
