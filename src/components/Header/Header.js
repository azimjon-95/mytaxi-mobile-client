import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./styles";
import TaxiAnimatedButton from "./TaxiAnimatedButton";

export default function Header({ hasDriver, onHamburgerPress, cashback, setHasDriver, onBackPress }) {
    const [navigat, setNavigat] = useState(null);

    const handleBack = () => {
        if (onBackPress) {
            onBackPress();
            setNavigat(null); // back bosilganda default holatga qaytarish
        }
    };

    const handleRefresh = () => {
        setHasDriver("drivers");
        setNavigat("refresh"); // TaxiAnimatedButton bosilganda back tugmasi faollashadi
    };

    // hasDriver "main" bo'lsa, barcha tugmalarni yashirish
    // if (hasDriver === "main" || hasDriver === "availableDrivers") {
    if (hasDriver === "main" || hasDriver === "availableDrivers" || hasDriver === "drivers") {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.hamburgerBtn}
                    onPress={onHamburgerPress}
                >
                    <View style={styles.hamburgerLine} />
                    <View style={styles.hamburgerLine} />
                    <View style={styles.hamburgerLine} />
                </TouchableOpacity>
                {cashback !== undefined && (
                    <View style={styles.cashbackBadge}>
                        <Text style={styles.cashbackText}>💰 {cashback.toLocaleString()} so'm</Text>
                    </View>
                )}
            </View>
        );
    }

    // Agar navigat null bo'lsa, elementlar ko'rinmas
    const showBackButton = navigat === "refresh" && hasDriver === "drivers";
    const showTaxiButton = navigat === null;

    return (
        <View style={styles.header}>
            {/* Hamburger / Back / TaxiAnimatedButton */}
            <View style={styles.headerBox}>
                {/* Hamburger tugmasi */}
                {showTaxiButton && (
                    <TouchableOpacity
                        style={styles.hamburgerBtn}
                        onPress={onHamburgerPress}
                    >
                        <View style={styles.hamburgerLine} />
                        <View style={styles.hamburgerLine} />
                        <View style={styles.hamburgerLine} />
                    </TouchableOpacity>
                )}

                {/* Back/Home tugmasi */}
                {!showBackButton && (
                    <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
                        <Icon name="home" size={28} color="white" />
                    </TouchableOpacity>
                )}

                {/* TaxiAnimatedButton */}
                {!showTaxiButton && (
                    <TouchableOpacity onPress={handleRefresh}>
                        <TaxiAnimatedButton />
                    </TouchableOpacity>
                )}
            </View>

            {/* Cashback */}
            {cashback !== undefined && (
                <View style={styles.cashbackBadge}>
                    <Text style={styles.cashbackText}>💰 {cashback.toLocaleString()} so'm</Text>
                </View>
            )}
        </View>
    );
}
