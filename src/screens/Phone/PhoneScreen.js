import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetUserByPhoneQuery } from "../../context/clientApi";

export default function PhoneScreen({ navigation }) {
    const [phone, setPhone] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    // RTK Query hook
    const { data: user, isFetching, refetch } = useGetUserByPhoneQuery(phone, {
        skip: phone.length < 9, // telefon noto‘g‘ri bo‘lsa fetch qilmaydi
    });

    const handleCheckPhone = async () => {
        if (phone.length < 9) {
            alert("Telefon raqam noto'g'ri");
            return;
        }

        try {
            await refetch(); // foydalanuvchini qayta tekshirish
            if (user) {
                navigation.navigate("Verify", { phone });
                await AsyncStorage.setItem("userData", JSON.stringify(user?.innerData));
            } else {
                navigation.navigate("UserInfo", { phone });
            }
        } catch (err) {
            navigation.navigate("UserInfo", { phone });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Telefon raqamingizni kiriting</Text>
                <Text style={styles.subtitle}>Tasdiqlash kodi yuboramiz</Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.prefix}>+998</Text>
                <TextInput
                    style={[styles.input, isFocused && { borderWidth: 0 }]}
                    keyboardType="phone-pad"
                    placeholder="90 123 45 67"
                    placeholderTextColor="#00ff8097"
                    value={phone}
                    onChangeText={setPhone}
                    maxLength={9} // faqat oxirgi 9 ta raqam
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    underlineColorAndroid="transparent"
                />
            </View>

            <TouchableOpacity
                style={[styles.btn, (phone.length < 9 || isFetching) && styles.btnDisabled]}
                onPress={handleCheckPhone}
                activeOpacity={0.8}
                disabled={phone.length < 9 || isFetching}
            >
                {isFetching ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.btnText}>Kod yuborish</Text>
                )}
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
                Telefon raqamingizga SMS orqali tasdiqlash kodi yuboriladi
            </Text>
        </View>
    );
}
