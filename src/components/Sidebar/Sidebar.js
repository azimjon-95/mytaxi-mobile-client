// Sidebar.js (yangilangan - sidebar stillari import qilindi, orderHistory mock data va yuklash funksiyasi o'z ichiga ko'chirildi)
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Pressable,
    ScrollView,
    Animated,
} from "react-native";
import sidebarStyles from "./styles"; // Sidebar uchun alohida stillar
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PhoneNumberFormat } from "../../hooks/NumberFormat";

export default function Sidebar({ visible, onClose, userData, cashback, navigation }) {
    const slideAnim = useState(new Animated.Value(-300))[0];
    const [orderHistory, setOrderHistory] = useState([]); // <-- Qo'shildi: Sidebar ichida orderHistory state

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: visible ? 0 : -300,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    // <-- Qo'shildi: orderHistory yuklash funksiyasi va useEffect
    useEffect(() => {
        loadOrderHistory();
    }, []);

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

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear(); // Storage'ni tozalash
            onClose();
            navigation.replace("Phone");

            // Web notification
            if ("Notification" in window) {
                if (Notification.permission === "granted") {
                    new Notification("Chiqish", {
                        body: "Siz akkauntdan muvaffaqiyatli chiqdingiz!",
                    });
                } else if (Notification.permission !== "denied") {
                    Notification.requestPermission().then((permission) => {
                        if (permission === "granted") {
                            new Notification("Chiqish", {
                                body: "Siz akkauntdan muvaffaqiyatli chiqdingiz!",
                            });
                        }
                    });
                }
            } else {
                console.log("Brauzeringiz notificationsni qo'llab-quvvatlamaydi.");
            }
        } catch (error) {
            console.log("AsyncStorage clear error:", error);
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable
                style={sidebarStyles.sidebarOverlay}
                onPress={onClose}
            >
                <Animated.View
                    style={[
                        sidebarStyles.sidebar,
                        { transform: [{ translateX: slideAnim }] },
                    ]}
                    onStartShouldSetResponder={() => true}
                >
                    <ScrollView>
                        {/* USER INFO */}
                        <View style={sidebarStyles.userSection}>
                            <View style={sidebarStyles.avatar}>
                                <Text style={sidebarStyles.avatarText}>
                                    {userData?.name?.charAt(0)}
                                    {userData?.surname?.charAt(0)}
                                </Text>
                            </View>
                            <Text style={sidebarStyles.userName}>
                                {userData?.name} {userData?.surname}
                            </Text>
                            <Text style={sidebarStyles.userPhone}>{PhoneNumberFormat(userData?.phone)} </Text>
                        </View>

                        {/* CASHBACK INFO */}
                        <TouchableOpacity style={sidebarStyles.menuItem}>
                            <Text style={sidebarStyles.menuIcon}>💰</Text>
                            <View>
                                <Text style={sidebarStyles.menuText}>Mening cashback</Text>
                                <Text style={sidebarStyles.cashbackAmount}>
                                    {cashback.toLocaleString()} so'm
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* MY PROFILE */}
                        <TouchableOpacity
                            style={sidebarStyles.menuItem}
                            onPress={() => {
                                onClose();
                                navigation.navigate("Profile", { userData });
                            }}
                        >
                            <Text style={sidebarStyles.menuIcon}>👤</Text>
                            <Text style={sidebarStyles.menuText}>Mening ma'lumotlarim</Text>
                        </TouchableOpacity>

                        {/* RECENT ORDERS */}
                        <View style={sidebarStyles.historySection}>
                            <Text style={sidebarStyles.historyTitle}>So'nggi buyurtmalar</Text>
                            {orderHistory.slice(0, 3).map((order) => (
                                <View key={order.id} style={sidebarStyles.historyCard}>
                                    <View style={sidebarStyles.historyHeader}>
                                        <Text style={sidebarStyles.historyDate}>
                                            {order.date} • {order.time}
                                        </Text>
                                        <Text style={sidebarStyles.historyCashback}>
                                            +{order.cashback.toLocaleString()}
                                        </Text>
                                    </View>
                                    <Text style={sidebarStyles.historyRoute}>
                                        {order.from} → {order.to}
                                    </Text>
                                    <Text style={sidebarStyles.historyPrice}>
                                        {order.price.toLocaleString()} so'm
                                    </Text>
                                </View>
                            ))}
                        </View>

                        {/* LOGOUT */}
                        <TouchableOpacity
                            style={[sidebarStyles.menuItem, sidebarStyles.logoutItem]}
                            onPress={handleLogout}
                        >
                            <Text style={sidebarStyles.menuIcon}>🚪</Text>
                            <Text style={[sidebarStyles.menuText, sidebarStyles.logoutText]}>
                                Chiqish
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </Animated.View>
            </Pressable>
        </Modal>
    );
}