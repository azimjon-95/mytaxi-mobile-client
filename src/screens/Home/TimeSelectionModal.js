import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    Pressable,
    ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCreateOrderMutation } from "../../context/orderApi";
import dayjs from "dayjs";
import styles from "./styles";

const TimeSelectionModal = ({ visible, onClose, setTimeSelected }) => {
    const timeOptions = [
        { label: "Hozir", value: "waiting" },
        { label: 15, value: "created" },
        { label: 25, value: "created" },
        { label: 1, value: "created" }, // 1 soat
    ];

    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const [selectedTime, setSelectedTime] = useState(null);

    const showNotification = async (title, body) => {
        await Notifications.scheduleNotificationAsync({
            content: { title, body, sound: true, priority: Notifications.AndroidNotificationPriority.HIGH },
            trigger: null,
        });
    };

    const sendOrder = async (timeOption) => {
        setSelectedTime(timeOption.label);

        try {
            const userJson = await AsyncStorage.getItem("userData");
            const user = userJson ? JSON.parse(userJson) : null;
            if (!user) {
                showNotification("Xatolik", "Foydalanuvchi ma'lumotlari topilmadi!");
                setSelectedTime(null);
                return;
            }

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                showNotification("Ruxsat kerak", "Geolokatsiya yoqilmagan!");
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

            // Vaqtni aniqlash
            let orderTime = dayjs();
            if (timeOption.value === "created") {
                if (timeOption.label >= 1 && timeOption.label <= 6) {
                    // 1 soat (agar soat bo‘lsa)
                    orderTime = orderTime.add(timeOption.label, "hour");
                } else {
                    // minutlar
                    orderTime = orderTime.add(timeOption.label, "minute");
                }
            }
            const formattedTime = orderTime.format("HH:mm");

            const newOrder = {
                id: Date.now(),
                clientId: user?._id,
                date: dayjs().format("YYYY-MM-DD"),
                time: formattedTime, // Bu yerda hisoblangan vaqt
                from: user.address,
                to: "Manzil " + Math.floor(Math.random() * 100),
                price: orderPrice,
                cashback: orderCashback,
                when: timeOption.value, // waiting yoki created
                location: coords,
                phoneId: user.phone,
            };

            await createOrder(newOrder).unwrap();

            const savedHistoryJson = await AsyncStorage.getItem("orderHistory");
            const savedHistory = savedHistoryJson ? JSON.parse(savedHistoryJson) : [];
            const updatedHistory = [newOrder, ...savedHistory];
            await AsyncStorage.setItem("orderHistory", JSON.stringify(updatedHistory));
            setTimeSelected(true);

            const savedCashback = parseFloat(await AsyncStorage.getItem("cashback") || "0");
            const newCashback = savedCashback + orderCashback;
            await AsyncStorage.setItem("cashback", newCashback.toString());

            showNotification(
                "✅ Tasdiqlandi",
                `Buyurtma qabul qilindi!\n+${orderCashback.toLocaleString()} so'm cashback olasiz!`
            );

            setSelectedTime(null);
            onClose();
        } catch (e) {
            console.error("Buyurtma yuborishda xatolik:", e);
            showNotification("Xatolik", "Buyurtma yuborishda xatolik yuz berdi!");
            setSelectedTime(null);
        }
    };

    return (
        <Modal animationType="slide" transparent visible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalBox}>
                    <Text style={styles.modalTitle}>Qachon taksi kelsin?</Text>

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
                                    {t.value === "created" && t.label >= 1 && t.label <= 6 ? `${t.label} soat` :
                                        t.value === "created" ? `${t.label} minut` : t.label}
                                </Text>
                            )}
                        </Pressable>
                    ))}

                    <Pressable
                        style={[
                            styles.timeBtn,
                            styles.cancelBtn,
                            selectedTime && { opacity: 0.6 }
                        ]}
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
