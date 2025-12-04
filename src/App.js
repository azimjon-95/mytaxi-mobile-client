import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhoneScreen from "./screens/Phone/PhoneScreen";
import VerifyScreen from "./screens/Screen/VerifyScreen";
import UserInfoScreen from "./screens/UserInfo/UserInfoScreen";
// import PinScreen from "./screens/PinScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

// Redux
import { Provider } from "react-redux";
import { store } from "./context/store"; // store.js yo‘lini moslashtiring

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const user = await AsyncStorage.getItem("token");
    if (user) setHasAccount(true);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={hasAccount ? "Home" : "Phone"}
        >
          <Stack.Screen name="Phone" component={PhoneScreen} />
          <Stack.Screen name="Verify" component={VerifyScreen} />
          <Stack.Screen name="UserInfo" component={UserInfoScreen} />
          {/* <Stack.Screen name="Pin" component={PinScreen} /> */}
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
