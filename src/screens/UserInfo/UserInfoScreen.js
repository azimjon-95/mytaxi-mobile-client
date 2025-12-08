import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { useSaveUserMutation } from "../../context/clientApi";
import { Notification } from "../../components/Notification";

export default function UserInfoScreen({ navigation, route }) {
    const { phone } = route.params;
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [focusedInput, setFocusedInput] = useState(null);

    const [saveUser, { isLoading }] = useSaveUserMutation();

    const saveData = async () => {
        if (!name || !surname || !age || !address) {
            return Notification("Xatolik", "Hammasi majburiy!", "error");
        }

        const user = { phone, name, surname, age, address };

        try {
            // Serverga yuborish
            // const response = await saveUser(user).unwrap();
            const response = await saveUser(user).unwrap();

            // AsyncStorage ga saqlash
            await AsyncStorage.setItem("userData", JSON.stringify(response?.innerData));

            if (response?.state === true) {
                Notification("Muvaffaqiyatli saqlandi", "success");
                navigation.navigate("Verify", { phone });
            }
        } catch (error) {
            Notification("Xatolik", error?.data?.message, "error");
        }
    };

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            <View style={styles.container}>
                <View style={styles.glowTop} />
                <View style={styles.glowBottom} />

                <View style={styles.headerSection}>
                    <Text style={styles.appTitle}>8080 MY TAKSI</Text>
                    <Text style={styles.subtitle}>Premium Taxi Service</Text>
                    <View style={styles.divider} />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.formTitle}>Shaxsiy Ma'lumotlar</Text>

                    <View style={styles.inputWrapper}>
                        <View style={styles.labelRow}>
                            <Text style={styles.labelIcon}>👤</Text>
                            <Text style={styles.label}>ISM</Text>
                        </View>
                        <TextInput
                            style={[styles.input, focusedInput === 'name' && styles.inputFocused]}
                            placeholder="Ismingizni kiriting"
                            placeholderTextColor="#4a5568"
                            value={name}
                            onChangeText={setName}
                            onFocus={() => setFocusedInput('name')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <View style={styles.labelRow}>
                            <Text style={styles.labelIcon}>📋</Text>
                            <Text style={styles.label}>FAMILIYA</Text>
                        </View>
                        <TextInput
                            style={[styles.input, focusedInput === 'surname' && styles.inputFocused]}
                            placeholder="Familiyangizni kiriting"
                            placeholderTextColor="#4a5568"
                            value={surname}
                            onChangeText={setSurname}
                            onFocus={() => setFocusedInput('surname')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <View style={styles.inputRow}>
                        <View style={[styles.inputWrapper, styles.inputHalf]}>
                            <View style={styles.labelRow}>
                                <Text style={styles.labelIcon}>🎂</Text>
                                <Text style={styles.label}>YOSH</Text>
                            </View>
                            <TextInput
                                style={[styles.input, focusedInput === 'age' && styles.inputFocused]}
                                placeholder="Yosh"
                                placeholderTextColor="#4a5568"
                                keyboardType="number-pad"
                                value={age}
                                onChangeText={setAge}
                                onFocus={() => setFocusedInput('age')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </View>

                        <View style={[styles.inputWrapper, styles.inputHalf]}>
                            <View style={styles.labelRow}>
                                <Text style={styles.labelIcon}>📞</Text>
                                <Text style={styles.label}>TELEFON</Text>
                            </View>
                            <TextInput
                                style={[styles.input, styles.inputDisabled]}
                                value={phone}
                                editable={false}
                            />
                        </View>
                    </View>

                    <View style={styles.inputWrapper}>
                        <View style={styles.labelRow}>
                            <Text style={styles.labelIcon}>📍</Text>
                            <Text style={styles.label}>MANZIL</Text>
                        </View>
                        <TextInput
                            style={[styles.input, styles.textArea, focusedInput === 'address' && styles.inputFocused]}
                            placeholder="To'liq manzilingizni kiriting"
                            placeholderTextColor="#4a5568"
                            value={address}
                            onChangeText={setAddress}
                            multiline
                            numberOfLines={3}
                            onFocus={() => setFocusedInput('address')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={saveData} activeOpacity={0.8} disabled={isLoading}>
                        <View style={styles.btnContent}>
                            <Text style={styles.btnText}>{isLoading ? "Saqlanmoqda..." : "DAVOM ETISH"}</Text>
                            <Text style={styles.btnArrow}>→</Text>
                        </View>
                        <View style={styles.btnGlow} />
                    </TouchableOpacity>

                    <View style={styles.securityNote}>
                        <Text style={styles.securityIcon}>🔒</Text>
                        <Text style={styles.securityText}>
                            Ma'lumotlaringiz shifrlangan holda xavfsiz saqlanadi
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
// const saveData = async () => {
//     if (!name || !surname || !age || !address) {
//         return Notification("Xatolik", "Hammasi majburiy!", "error");
//     }

//     const user = { phone, name, surname, age, address };

//     try {

//         // console.log(user);
//         const response = await axios.post(
//             "http://192.168.1.102:5000/api/v1/client",
//             user,

//         )

//         // AsyncStorage ga saqlash
//         await AsyncStorage.setItem("userData", JSON.stringify(response?.innerData));

//         if (response?.state === true) {
//             Notification("Muvaffaqiyatli saqlandi", "success");
//             navigation.navigate("Verify", { phone });
//         }
//     } catch (error) {
//         Notification("Xatolik", error?.data?.message, "error");
//     }
// };