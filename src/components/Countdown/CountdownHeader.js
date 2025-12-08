import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import styles from "./styles"; // yo‘lni moslang

export default function CountdownHeader({
    driversLength = 0,
    countdown = 0,
    selectedTaxi,
    drivers = null,
}) {
    const [showCancelModal, setShowCancelModal] = useState(false);

    function handleCancelOrder() {
        setShowCancelModal(false);
        // ❗ Agar asosiy parentga xabar berish kerak bo‘lsa:
        // onCancel && onCancel();
    }

    return (
        <>
            {/* HEADER UI */}
            <View style={styles.countdownContainer}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Text
                        style={{
                            color: "#00ff7f",
                            fontSize: 12,
                            fontWeight: "600",
                            opacity: 0.9,
                            marginTop: 5,
                        }}
                    >
                        Taksi: {driversLength}
                    </Text>
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
                        <Text
                            style={{
                                color: "#ff4444",
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            ✕
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* COUNTDOWN */}

            </View>

            {/* CANCEL MODAL — shu komponentga ko‘chirildi */}
            <Modal
                visible={showCancelModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowCancelModal(false)}
            >
                <View style={styles.modalOverlay_li}>
                    <View style={styles.modalContainer_li}>
                        <Text style={styles.modalTitle_li}>
                            Siz rostdan taksi zakazini bekor qilmoqchimisiz?
                        </Text>

                        <Text style={styles.modalText_li}>
                            Agar buyurtmani bekor qilsangiz, cashbackingizdan 2 000 so‘m ushlab qolinadi.
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                width: "100%",
                                gap: 12,
                            }}
                        >
                            <TouchableOpacity
                                onPress={handleCancelOrder}
                                style={styles.modalButton_li}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                    }}
                                >
                                    Bekor qilish
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setShowCancelModal(false)}
                                style={styles.modalButtonSl}
                            >
                                <Text
                                    style={{
                                        color: "#00ff7f",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                    }}
                                >
                                    Yopish
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}
