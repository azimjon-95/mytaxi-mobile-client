import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LicensePlate = ({ number, type = 'auto', size = 'medium' }) => {
    // Bo'sh bo'shliqlarni olib tashlash
    const cleanNumber = number.replace(/\s+/g, '');

    // Raqam formatini aniqlash
    const detectFormat = (num) => {
        // Format: 01A123BC yoki 01123ABC
        const hasEarlyLetter = /^\d{2}[A-Z]/.test(num);
        return hasEarlyLetter ? 'old' : 'new';
    };

    const format = type === 'auto' ? detectFormat(cleanNumber) : type;

    // Eski format: 40A077VA
    const parseOldFormat = (num) => {
        const region = num.substring(0, 2);
        const letter1 = num.substring(2, 3);
        const digits = num.substring(3, 6);
        const letters = num.substring(6, 8);
        return { region, letter1, digits, letters };
    };

    // Yangi format: 01550000
    const parseNewFormat = (num) => {
        const region = num.substring(0, 2);
        const digits = num.substring(2, 5);
        const letters = num.substring(5, 8);
        return { region, digits, letters };
    };

    const parts = format === 'old' ? parseOldFormat(cleanNumber) : parseNewFormat(cleanNumber);
    const sizeStyles = styles[size] || styles.medium;

    return (
        <View style={[styles.plate, sizeStyles.plate]}>
            <View style={[styles.dot1, sizeStyles.dot]} />
            <View style={[styles.dot2, sizeStyles.dot]} />

            {/* Region qismi */}
            <View style={styles.regionSection}>
                <Text style={[styles.regionText, sizeStyles.regionText]}>{parts.region}</Text>
            </View>

            {/* Vertikal chiziq */}
            <View style={[styles.divider, sizeStyles.divider]} />

            {/* Asosiy raqam qismi */}
            <View style={styles.numberSection}>
                {format === 'old' ? (
                    <Text style={[styles.numberText, sizeStyles.numberText]}>
                        {parts?.letter1} {parts.digits} {parts.letters}
                    </Text>
                ) : (
                    <Text style={[styles.numberText, sizeStyles.numberText]}>
                        {parts?.digits} {parts.letters}
                    </Text>
                )}
            </View>

            {/* O'zbekiston belgisi */}
            <View style={styles.uzSection}>
                <View style={[styles.flag, sizeStyles.flag]}>
                    <View style={styles.flagBlue} />
                    <View style={styles.flagWhite} />
                    <View style={styles.flagGreen} />
                </View>
                <Text style={[styles.uzText, sizeStyles.uzText]}>UZ</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    plate: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderWidth: 3,
        borderColor: '#000000',
        borderRadius: 8,
        alignItems: 'center',
        height: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'relative',
    },
    regionSection: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot1: {
        borderRadius: 2,
        backgroundColor: '#000',
        position: 'absolute',
        right: 2,
        top: "42%"
    },
    dot2: {
        borderRadius: 2,
        backgroundColor: '#000',
        position: 'absolute',
        left: 1,
        top: "42%"

    },
    regionText: {
        fontWeight: 'bold',
        color: '#000',
        paddingBottom: 3,

    },
    divider: {
        backgroundColor: '#000',
    },
    numberSection: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 3,
    },
    numberText: {
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 2,
    },
    uzSection: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        // backgroundColor: '#000',
        marginTop: 2,
    },

    flagBlue: {
        flex: 1,
        backgroundColor: '#0099CC',
    },
    flagWhite: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    flagGreen: {
        flex: 1,
        backgroundColor: '#1EB53A',
    },
    uzText: {
        fontWeight: 'bold',
        color: '#0099CC',
        letterSpacing: 0.5,
    },



    // Medium size (default)
    medium: {
        plate: {
            // paddingVertical: 8,
            // paddingHorizontal: 6,
            paddingLeft: 4,
            paddingRight: 2,
            position: 'relative',
        },
        dot: {
            width: 2,
            height: 2,
            marginVertical: 2,
        },
        regionText: {
            fontSize: 20,
        },
        divider: {
            width: 2,
            height: 30,
            marginHorizontal: 4,
        },
        numberText: {
            fontSize: 20,
        },
        flag: {
            width: 10,
            height: 6,
        },
        uzText: {
            fontSize: 6,
        },
    },

});

export default LicensePlate;