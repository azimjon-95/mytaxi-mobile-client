import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useCancelOrderMutation } from "../../context/orderApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";

export default function CountdownHeader({
    driversLength = 0,
    countdown = 0,
    selectedTaxi,
    orderId,
    onCancelled, // parentga xabar berish uchun optional
}) {
    const [showCancelModal, setShowCancelModal] = useState(false);

    // RTK mutation
    const [cancelOrder, { isLoading: cancelLoading }] = useCancelOrderMutation();

    const handleCancelOrder = async () => {
        if (!orderId) return;

        try {
            const res = await cancelOrder({
                orderId,
                body: {
                    cancelledBy: "client",
                    cancelReason: "Client cancelled",
                },
            }).unwrap();

            // 🔥 Agar cancel success bo'lsa → localStorage ni tozalash
            const emptyStatus = {
                status: false,
                order: {},
            };

            await AsyncStorage.setItem(
                "activeOrderStatus",
                JSON.stringify(emptyStatus)
            );

            setShowCancelModal(false);

            // parentga xabar
            onCancelled && onCancelled();

        } catch (error) {
            console.log("Cancel error:", error);
            setShowCancelModal(false);
        }
    };


    return (
        <>
            {/* HEADER */}
            <View style={styles.countdownContainer}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                }}>
                    <Text style={{
                        color: "#00ff7f",
                        fontSize: 12,
                        fontWeight: "600",
                        opacity: 0.9,
                        marginTop: 5,
                    }}>Taksi: {driversLength}</Text>

                    {selectedTaxi && (
                        <Text style={styles.countdownText}>
                            {Math.floor(countdown / 60)}:
                            {(countdown % 60).toString().padStart(2, "0")}
                        </Text>
                    )}

                    {/* CANCEL BUTTON */}
                    <TouchableOpacity
                        onPress={() => setShowCancelModal(true)}
                        style={styles.cancelButton}
                        disabled={driversLength === 0}
                    >
                        <Text style={{
                            color: "#ff4444",
                            fontSize: 18,
                            fontWeight: "bold",
                        }}>✕</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* CANCEL MODAL */}
            <Modal
                visible={showCancelModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowCancelModal(false)}
            >
                <View style={styles.modalOverlay_li}>
                    <View style={styles.modalContainer_li}>
                        <Text style={styles.modalTitle_li}>
                            Rostdan bekor qilmoqchimisiz?
                        </Text>

                        <Text style={styles.modalText_li}>
                            Bekor qilsangiz cashbackingizdan 2 000 so‘m ushlab qolinadi.
                        </Text>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            width: "100%",
                            gap: 12,
                        }}>
                            <TouchableOpacity
                                onPress={handleCancelOrder}
                                style={[styles.modalButton_li, { opacity: cancelLoading ? 0.5 : 1 }]}
                                disabled={cancelLoading}
                            >
                                <Text style={styles.modalBtnText}>
                                    {cancelLoading ? "Kutilmoqda..." : "Bekor qilish"}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setShowCancelModal(false)}
                                style={styles.modalButtonSl}
                            >
                                <Text style={{
                                    color: "#00ff7f",
                                    fontWeight: "bold",
                                    fontSize: 16,
                                }}>Yopish</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}
