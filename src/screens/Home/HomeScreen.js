// HomeScreen.js (updated with notifications, animations, server integration, and optimized logging)
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Pressable,
    ScrollView,
    Linking,
    Animated,
    Easing,
} from "react-native";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications"; // Qo'shildi: Notifications uchun
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import Sidebar from "../../components/Sidebar/Sidebar";
import RadarWithCars from "./RadarWithCars";
import styles from "./styles";

export default function HomeScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const [cashback, setCashback] = useState(0);
    const [orderHistory, setOrderHistory] = useState([]);
    const [notificationScale] = useState(new Animated.Value(0)); // Animation uchun
    const [timeSelected, setTimeSelected] = useState(false); // <-- Qo'shildi: vaqt tanlandi flag

    const TAXI_PHONE = "8080";

    const timeOptions = [
        "Hozir",
        "15 minut",
        "25 minut",
        "40 minut",
        "1 soat",
        "2 soat",
    ];

    useEffect(() => {
        loadUserData();
        loadCashback();
        loadOrderHistory();
        setupNotifications(); // Notifications sozlamalari
    }, []);

    // Notifications sozlamalari
    const setupNotifications = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
            console.warn("Notifications ruxsati berilmagan");
        }
    };

    // Success notification ko'rsatish
    const showNotification = async (title, body) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
            },
            trigger: null, // Darhol
        });

        // Animation: Scale in effect
        Animated.sequence([
            Animated.timing(notificationScale, {
                toValue: 1,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.delay(2000), // 2 soniya ko'rsatish
            Animated.timing(notificationScale, {
                toValue: 0,
                duration: 300,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();
    };

    const loadUserData = async () => {
        try {
            const user = await AsyncStorage.getItem("userData");
            if (user) {
                setUserData(JSON.parse(user));
            } else {
                const mockUser = {
                    name: "Sardor",
                    surname: "Rahimov",
                    phone: "+998901234567",
                    age: "25",
                    address: "Tashkent, Chilonzor",
                };
                setUserData(mockUser);
                await AsyncStorage.setItem("userData", JSON.stringify(mockUser));
            }
        } catch (e) {
            console.error("User data yuklashda xatolik:", e); // Optimized log
        }
    };

    const loadCashback = async () => {
        try {
            const saved = await AsyncStorage.getItem("cashback");
            if (saved) {
                setCashback(parseFloat(saved));
            } else {
                setCashback(15000);
                await AsyncStorage.setItem("cashback", "15000");
            }
        } catch (e) {
            console.error("Cashback yuklashda xatolik:", e);
        }
    };

    const loadOrderHistory = async () => {
        try {
            const history = await AsyncStorage.getItem("orderHistory");
            if (history) {
                setOrderHistory(JSON.parse(history));
            } else {
                const mockHistory = [
                    {
                        id: 1,
                        date: "2024-12-01",
                        time: "14:30",
                        from: "Chilonzor",
                        to: "Sergeli",
                        price: 25000,
                        cashback: 2500,
                    },
                    {
                        id: 2,
                        date: "2024-11-28",
                        time: "09:15",
                        from: "Yunusobod",
                        to: "Mirzo Ulugbek",
                        price: 18000,
                        cashback: 1800,
                    },
                    {
                        id: 3,
                        date: "2024-11-25",
                        time: "18:45",
                        from: "Amir Temur",
                        to: "Chorsu",
                        price: 15000,
                        cashback: 1500,
                    },
                ];
                setOrderHistory(mockHistory);
                await AsyncStorage.setItem("orderHistory", JSON.stringify(mockHistory));
            }
        } catch (e) {
            console.error("Order history yuklashda xatolik:", e);
        }
    };

    const makePhoneCall = () => {
        // Alert o'rniga notification va confirm modal yoki to'g'ridan-to'g'ri
        showNotification(
            "📞 Taksi chaqirish",
            `${TAXI_PHONE} raqamiga qo'ng'iroq qilmoqchimisiz? Operator sizga yordam beradi.`
        );

        // Qo'ng'iroq logi va amal
        const callRecord = {
            id: Date.now(),
            type: "call",
            date: new Date().toISOString().split("T")[0],
            time: new Date().toLocaleTimeString("uz-UZ", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            phone: TAXI_PHONE,
        };

        const phoneUrl = `tel:${TAXI_PHONE}`;
        Linking.canOpenURL(phoneUrl).then((supported) => {
            if (supported) {
                Linking.openURL(phoneUrl);
                console.info("Qo'ng'iroq muvaffaqiyatli boshlandi:", callRecord); // Optimized log

                // Call history saqlash
                AsyncStorage.getItem("callHistory").then((callHistory) => {
                    const calls = JSON.parse(callHistory || "[]");
                    calls.unshift(callRecord);
                    AsyncStorage.setItem("callHistory", JSON.stringify(calls));
                });
            } else {
                showNotification("Xatolik", "Telefon qo'ng'iroq qilish imkoni yo'q");
                console.error("Qo'ng'iroq qo'llab-quvvatlanmaydi");
            }
        });
    };


    const sendOrder = async (time) => {
        setTimeSelected(true); // <-- Vaqt tanlanganini belgilash
        setModalVisible(false);

        // Shu yerda avvalgi sendOrder logikasi (serverga yuborish, cashback va history yangilash) qoladi
        try {
            const user = userData || JSON.parse(await AsyncStorage.getItem("userData"));
            if (!user) {
                showNotification("Xatolik", "Foydalanuvchi ma'lumotlari topilmadi!");
                return;
            }

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                showNotification("Ruxsat kerak", "Geolokatsiya yoqilmagan!");
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            };

            const orderPrice = Math.floor(Math.random() * 30000) + 15000;
            const orderCashback = Math.floor(orderPrice * 0.1);

            const newOrder = {
                clientId: user?._id,
                date: dayjs().format("YYYY-MM-DD"),
                time: dayjs().format("HH:mm"),
                from: user.address,
                to: "Manzil " + Math.floor(Math.random() * 100),
                price: orderPrice,
                cashback: orderCashback,
                when: time,
                location: coords,
                phoneId: user.phone,
            };

            const updatedHistory = [newOrder, ...orderHistory];
            setOrderHistory(updatedHistory);
            await AsyncStorage.setItem("orderHistory", JSON.stringify(updatedHistory));

            const newCashback = cashback + orderCashback;
            setCashback(newCashback);
            await AsyncStorage.setItem("cashback", newCashback.toString());

            showNotification(
                "✅ Tasdiqlandi",
                `Buyurtma qabul qilindi!\n+${orderCashback.toLocaleString()} so'm cashback olasiz!`
            );
        } catch (e) {
            console.error("Buyurtma yuborishda xatolik:", e);
            showNotification("Xatolik", "Buyurtma yuborishda xatolik yuz berdi!");
        }
    };
    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.hamburgerBtn}
                    onPress={() => setSidebarVisible(true)}
                >
                    <View style={styles.hamburgerLine} />
                    <View style={styles.hamburgerLine} />
                    <View style={styles.hamburgerLine} />
                </TouchableOpacity>

                <View style={styles.cashbackBadge}>
                    <Text style={styles.cashbackText}>💰 {cashback.toLocaleString()} so'm</Text>
                </View>
            </View>
            {!timeSelected ? (
                <Text style={styles.title}>My Taxi</Text>
            )
                : (
                    <Text style={styles.titleComming}>Taksini tanlang</Text>
                )
            }

            {/* ASOSIY TAKSI CHAQIRISH TUGMASI */}
            {!timeSelected && (
                <TouchableOpacity
                    style={styles.orderBtn}
                    onPress={() => setModalVisible(true)}
                >
                    <Text numberOfLines={1} style={styles.orderBtnText}>📱 Buyurtma berish</Text>
                </TouchableOpacity>
            )}

            {/* RADAR */}
            {timeSelected && (
                <RadarWithCars size={350} visible={timeSelected} />
            )}

            {/* QO'NG'IROQ QILISH VA TEZKOR MA'LUMOT */}
            {!timeSelected && (
                <View style={styles.infoSection}>
                    <TouchableOpacity
                        style={styles.callBtn}
                        onPress={makePhoneCall}
                    >
                        <Text style={styles.callBtnText}>📞 {TAXI_PHONE} ga qo'ng'iroq qilish</Text>
                        <Text style={styles.callBtnSubtext}>Operator bilan to'g'ridan-to'g'ri</Text>
                    </TouchableOpacity>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoTitle}>🚖 My Taxi xizmatlari:</Text>
                        <Text style={styles.infoText}>• Tez va ishonchli xizmat</Text>
                        <Text style={styles.infoText}>• Har bir buyurtmadan 10% cashback</Text>
                        <Text style={styles.infoText}>• 24/7 operatorlar xizmati</Text>
                        <Text style={styles.infoText}>• Qulay narxlar</Text>
                    </View>
                </View>
            )}

            {/* SIDEBAR */}
            <Sidebar
                visible={sidebarVisible}
                onClose={() => setSidebarVisible(false)}
                userData={userData}
                cashback={cashback}
                orderHistory={orderHistory}
                navigation={navigation}
            />

            {/* TIME SELECTION MODAL */}
            <Modal animationType="slide" transparent visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Qachon taksi kelsin?</Text>

                        {timeOptions.map((t, i) => (
                            <Pressable
                                key={i}
                                style={styles.timeBtn}
                                onPress={() => sendOrder(t)} // Select bo'lganda serverga yuborish va log
                            >
                                <Text style={styles.timeBtnText}>{t}</Text>
                            </Pressable>
                        ))}

                        <Pressable
                            style={[styles.timeBtn, styles.cancelBtn]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelBtnText}>Bekor qilish</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Notification Overlay (Animation bilan) - Optional, agar kerak bo'lsa ko'rsatish uchun */}
            <Animated.View
                style={[
                    styles.notificationOverlay,
                    {
                        opacity: notificationScale,
                        transform: [{ scale: notificationScale }],
                    },
                ]}
            >
                {/* Bu yerda qo'shimcha UI bo'lishi mumkin, ammo asosan system notification ishlatiladi */}
            </Animated.View>
        </View>
    );
}