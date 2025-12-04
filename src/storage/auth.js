import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";

export const auth = {
    // 1️⃣ Telefon raqamni yuborish → server SMS kod yuboradi
    sendPhone: async (phone) => {
        return await api.post("/auth/send-phone", { phone });
    },

    // 2️⃣ SMS kodni tasdiqlash
    verifyCode: async (phone, code) => {
        const res = await api.post("/auth/verify", { phone, code });

        if (res?.token) {
            await AsyncStorage.setItem("token", res.token);
            await AsyncStorage.setItem("phone", phone);
        }

        return res;
    },

    // 3️⃣ Ro‘yxatdan o‘tish
    register: async (data) => {
        /*
          data = {
            name,
            surname,
            age,
            address,
          }
        */

        const res = await api.post("/auth/register", data);

        if (res?.user) {
            await AsyncStorage.setItem("userData", JSON.stringify(res.user));
        }

        return res;
    },

    // 4️⃣ PIN kodni saqlash
    savePin: async (pin) => {
        await AsyncStorage.setItem("userPin", pin);
        return true;
    },

    // 5️⃣ PIN kodni tekshirish
    checkPin: async (pin) => {
        const realPin = await AsyncStorage.getItem("userPin");
        return realPin === pin;
    },

    // 6️⃣ User malumotlarini olish
    getUser: async () => {
        const user = await AsyncStorage.getItem("userData");
        return user ? JSON.parse(user) : null;
    },

    // 7️⃣ Logout
    logout: async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("userData");
        await AsyncStorage.removeItem("userPin");
        return true;
    },
};
