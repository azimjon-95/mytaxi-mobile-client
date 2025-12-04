// HomeScreen.js (yangilangan: orderHistory yuklash va state olib tashlandi, modal yopilganda faqat kerakli reloadlar qoldirildi)
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Linking,
    Animated,
    Easing,
} from "react-native";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import Sidebar from "../../components/Sidebar/Sidebar";
import RadarWithCars from "./RadarWithCars";
import HomeLoaction from "./HomeLoaction";
import { useWatchActiveOrderQuery } from "../../context/orderApi";
import TimeSelectionModal from "./TimeSelectionModal"; // <-- Qo'shildi: alohida komponent
import styles from "./styles";

export default function HomeScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const [cashback, setCashback] = useState(0);
    const [notificationScale] = useState(new Animated.Value(0));
    const [timeSelected, setTimeSelected] = useState(false);

    const { data: activeOrder, isLoading } = useWatchActiveOrderQuery(userData?._id, {
        skip: !userData?._id,
    });
    console.log(activeOrder);


    useEffect(() => {
        if (isLoading || !activeOrder?.message) return;

        const { status, activeOrder: order } = activeOrder.message;

        if (status !== undefined) {
            const saveStatus = async () => {
                try {
                    await AsyncStorage.setItem(
                        "activeOrderStatus",
                        JSON.stringify({ status, order: order || null })
                    );
                    setTimeSelected(status === "true");
                } catch (e) {
                    console.error("Active order saqlashda xatolik:", e);
                }
            };

            saveStatus();
        }
    }, [activeOrder, isLoading]);


    const TAXI_PHONE = "8080";

    useEffect(() => {
        loadCashback();
        loadTimeSelected(); // <-- Qo'shildi: timeSelected yuklash
        setupNotifications();
    }, []);

    const loadTimeSelected = async () => {
        try {
            const saved = JSON.parse(await AsyncStorage.getItem("activeOrderStatus"));
            setTimeSelected(saved.sratus === "true");
        } catch (e) {
            console.error("Time selected yuklashda xatolik:", e);
        }
    };

    // <-- Yangilandi: Modal yopilganda faqat kerakli ma'lumotlarni qayta yuklash (orderHistory olib tashlandi)
    useEffect(() => {
        if (!modalVisible) {
            loadCashback();
            loadTimeSelected();
        }
    }, [modalVisible]);

    const setupNotifications = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
            console.warn("Notifications ruxsati berilmagan");
        }
    };

    // Success notification ko'rsatish (faqat HomeScreen uchun animation bilan)
    const showNotification = async (title, body) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
            },
            trigger: null,
        });

        Animated.sequence([
            Animated.timing(notificationScale, {
                toValue: 1,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.delay(2000),
            Animated.timing(notificationScale, {
                toValue: 0,
                duration: 300,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();
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

    // loadOrderHistory funksiyasi olib tashlandi (Sidebar ga ko'chirildi)

    const makePhoneCall = () => {
        showNotification(
            "📞 Taksi chaqirish",
            `${TAXI_PHONE} raqamiga qo'ng'iroq qilmoqchimisiz? Operator sizga yordam beradi.`
        );

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
                console.info("Qo'ng'iroq muvaffaqiyatli boshlandi:", callRecord);

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

            {/* <HomeLoaction /> */}
            {!timeSelected ? (
                <Text style={styles.title}>My Taxi</Text>
            ) : (
                <Text style={styles.titleComming}>Taksini tanlang</Text>
            )}

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

            {/* SIDEBAR (orderHistory prop olib tashlandi) */}
            <Sidebar
                visible={sidebarVisible}
                onClose={() => setSidebarVisible(false)}
                userData={userData}
                cashback={cashback}
                navigation={navigation}
            />

            {/* TIME SELECTION MODAL (alohida komponentga almashtirildi, minimal props) */}
            <TimeSelectionModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                setTimeSelected={setTimeSelected}
            />

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