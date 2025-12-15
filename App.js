import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import { NotificationProvider } from "./src/components/Notification";
import PhoneScreen from "./src/screens/Phone/PhoneScreen";
import VerifyScreen from "./src/screens/Screen/VerifyScreen";
import UserInfoScreen from "./src/screens/UserInfo/UserInfoScreen";
import { StatusBar } from "expo-status-bar";
import * as Linking from 'expo-linking';
import Home from "./src/Main";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccount, setHasAccount] = useState(false);
  const redirectUrl = Linking.createURL('/'); // sizning path


  // === TOKEN TEKSHIRISH ===
  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setHasAccount(!!token); // token bor bo‘lsa true
      } catch (e) {
        console.log("Token error:", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  // === LOADING EKRANI ===
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#101820",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <NotificationProvider>
      <StatusBar style="light" backgroundColor="#101820" />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
          initialRouteName={hasAccount ? "Home" : "Phone"}
        >
          <Stack.Screen name="Phone" component={PhoneScreen} />
          <Stack.Screen name="Verify" component={VerifyScreen} />
          <Stack.Screen name="UserInfo" component={UserInfoScreen} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotificationProvider>
  );
}
