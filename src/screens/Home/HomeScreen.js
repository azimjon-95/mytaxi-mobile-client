import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import TimeSelectionModal from "./TimeSelectionModal";
import { Notification } from "../../components/Notification";
import styles from "./styles/Home";

export default function HomeScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);


    const TAXI_PHONE = "8080";

    const makePhoneCall = () => {
        Notification(`📞 ${TAXI_PHONE} raqamiga qo'ng'iroq qilindi`,
            "success"
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
                AsyncStorage.getItem("callHistory").then((callHistory) => {
                    const calls = JSON.parse(callHistory || "[]");
                    calls.unshift(callRecord);
                    AsyncStorage.setItem("callHistory", JSON.stringify(calls));
                });
            } else {
                Notification("Telefon qo'ng'iroq qilish imkoni yo'q", "error");
            }
        });
    };
    return (
        <View style={styles.container}>

            <Text style={styles.title}>My Taxi</Text>

            <TouchableOpacity
                style={styles.orderBtn}
                onPress={() => setModalVisible(true)}
            >
                <Text numberOfLines={1} style={styles.orderBtnText}>
                    📱 Buyurtma berish
                </Text>
            </TouchableOpacity>

            <View style={styles.infoSection}>
                <TouchableOpacity style={styles.callBtn} onPress={makePhoneCall}>
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

            {/* TIME MODAL */}
            <TimeSelectionModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />

        </View>
    );
}