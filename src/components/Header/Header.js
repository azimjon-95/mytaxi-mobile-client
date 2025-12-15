import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import TaxiAnimatedButton from "./TaxiAnimatedButton";

export default function Header({
    hasDriver,
    onHamburgerPress,
    cashback,
    setHasDriver,
    onBackPress
}) {

    // 🔥 faqat back bosilganda taxi tugma ochiladi
    const [carGoing, setCarGoing] = useState(false);

    // BACK bosilganda → TaxiAnimatedButton ochiladi
    const handleBack = () => {
        setCarGoing(true);   // TaxiAnimatedButton yoqiladi
        onBackPress();
    };


    // TaxiAnimatedButton bosilganda → refresh + yana carGoing false
    const handleRefresh = () => {
        setHasDriver("driver");
        setCarGoing(false);
    };

    // "main" yoki "availableDrivers" bo‘lsa — faqat hamburger
    if (hasDriver === "main" || hasDriver === "availableDrivers") {

        return (
            <View style={styles.header}>
                <View style={styles.headerBox}>
                    <TouchableOpacity style={styles.hamburgerBtn} onPress={onHamburgerPress}>
                        <View style={styles.hamburgerLine} />
                        <View style={styles.hamburgerLine} />
                        <View style={styles.hamburgerLine} />
                    </TouchableOpacity>

                    {/* TAXI ANIMATED BUTTON (faqat back bosilganda chiqadi) */}
                    {carGoing && (
                        <TouchableOpacity onPress={handleRefresh}>
                            <TaxiAnimatedButton />
                        </TouchableOpacity>
                    )}
                </View>

                {cashback !== undefined && (
                    <View style={styles.cashbackBadge}>
                        <Text style={styles.cashbackText}>💰 {cashback.toLocaleString()} so'm</Text>
                    </View>
                )}
            </View>
        );
    }

    return (
        <View style={styles.header}>
            <View style={styles.headerBox}>

                {/* HAMBURGER */}
                {!carGoing && (
                    <TouchableOpacity
                        style={styles.hamburgerBtn}
                        onPress={onHamburgerPress}
                    >
                        <View style={styles.hamburgerLine} />
                        <View style={styles.hamburgerLine} />
                        <View style={styles.hamburgerLine} />
                    </TouchableOpacity>
                )}

                {/* HOME / BACK BUTTON */}
                {!carGoing && (
                    <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
                        <Icon name="home" size={28} color="#00ff7f" />
                    </TouchableOpacity>
                )}


            </View>

            {/* CASHBACK */}
            {cashback !== undefined && (
                <View style={styles.cashbackBadge}>
                    <Text style={styles.cashbackText}>💰 {cashback.toLocaleString()} so'm</Text>
                </View>
            )}
        </View>
    );
}
