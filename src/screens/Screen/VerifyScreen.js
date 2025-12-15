import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { useLoginWithPinMutation } from "../../context/clientApi"; // RTK Query mutation

export default function VerifyScreen({ navigation, route }) {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const [loginWithPin] = useLoginWithPinMutation();

    const phone = route.params.phone;

    // useEffect(() => {
    //     const checkToken = async () => {
    //         const userData = await AsyncStorage.getItem("userData");
    //         if (userData) {
    //             const parsed = JSON.parse(userData);
    //             if (parsed) {
    //                 navigation.replace("Home");
    //             }
    //         }
    //     };
    //     checkToken();
    // }, []);

    const verify = async () => {
        if (code.length < 4) return alert("Kod xato!");

        try {
            setLoading(true);

            const res = await loginWithPin({ phone, pin: code }).unwrap();

            if (res?.state === false) {
                alert(res?.message || "PIN noto‘g‘ri");
            } else {
                // User ma'lumotlarini saqlaymiz
                await AsyncStorage.setItem("userData", JSON.stringify(res?.innerData?.user || res?.user));
                await AsyncStorage.setItem("token", JSON.stringify(res?.innerData?.token));
                navigation.replace("Home"); // Home ekraniga o'tish
            }

        } catch (err) {
            console.log(err);

            alert(err?.data?.message || "Xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Tasdiqlash kodi</Text>
                <Text style={styles.subtitle}>{phone} raqamiga yuborildi</Text>
            </View>

            <TextInput
                style={styles.input}
                keyboardType="number-pad"
                placeholder="• • • •"
                placeholderTextColor="#00ff8097"
                value={code}
                onChangeText={setCode}
                maxLength={4}
                textAlign="center"
            />

            <TouchableOpacity
                style={[styles.btn, (code.length < 4 || loading) && styles.btnDisabled]}
                onPress={verify}
                activeOpacity={0.8}
                disabled={code.length < 4 || loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Tasdiqlash</Text>}
            </TouchableOpacity>


        </View>
    );
}
