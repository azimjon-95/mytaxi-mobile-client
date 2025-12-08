import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Notification } from "./components/Notification";
import socket from "./socket";
import HomeScreen from "./screens/Home/HomeScreen";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import RadarWithCars from "./screens/Home/RadarWithCars";
import ActiveTaxiTracker from "./screens/Home/ActiveTaxiTracker";
import { useGetAvailableDriversQuery } from "./context/orderApi";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Main() {
  const { height: screenHeight } = Dimensions.get("window");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const cashback = 10000;

  // Order & client info
  const [orderData, setOrderData] = useState(null);
  const [clientId, setClientId] = useState(null);

  // Driver state
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [drivers, setDrivers] = useState(null);
  const [hasDriver, setHasDriver] = useState("main");
  const [timeSelected, setTimeSelected] = useState(false);
  const { data: apiData, isLoading } = useGetAvailableDriversQuery(
    { clientId, orderId: orderData }
  );


  // =======================================
  // Load user & order data
  useEffect(() => {

    const loadSaved = async () => {
      try {
        const value = JSON.parse(await AsyncStorage.getItem("activeOrderStatus"));
        const clientData = JSON.parse(await AsyncStorage.getItem("userData"));
        if (value?.order?._id) setOrderData(value.order._id);
        if (clientData?._id) setClientId(clientData._id);
      } catch (e) {
        Notification(`Ma'lumotlarni yuklashda xatolik: ${e}`, "error");
      }
    };

    loadSaved();
  }, []);

  // =======================================
  useEffect(() => {
    const innerData = apiData?.innerData;
    if (!innerData) return;

    if (innerData.status === "availableDrivers") {
      setAvailableDrivers(innerData.availableDrivers || []);
      setDrivers(null);
      setHasDriver("availableDrivers");
    } else if (innerData.status === "driver") {
      setDrivers(innerData.driver || null);
      setAvailableDrivers(innerData.availableDrivers || []);
      setHasDriver("drivers");
    } else {
      setAvailableDrivers([]);
      setDrivers(null);
      setHasDriver("main");
      setTimeSelected(false);
    }
  }, [apiData]);
  // Soket bilan real-time update
  useEffect(() => {
    const handler = (data) => {
      if (!data) return;

      if (data.status === "availableDrivers") {
        setAvailableDrivers(data.availableDrivers || []);
        setDrivers(null);
        setHasDriver("availableDrivers");
      } else if (data.status === "driver") {
        setDrivers(data.driver || null);
        setAvailableDrivers(data.availableDrivers || []);
        setHasDriver("drivers");
      } else {
        setDrivers(null);
        setAvailableDrivers([]);
        setHasDriver("main");
        setTimeSelected(false);
      }
    };

    socket.on("availableDriversUpdate", handler);
    return () => socket.off("availableDriversUpdate", handler);
  }, []);


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#101820", color: "#fff" }}>
        <View style={{
          flex: 1,
          backgroundColor: "#101820",
          paddingTop: 10,
          display: "flex",
          flexDirection: "column",
          height: screenHeight,
          justifyContent: "flex-end"

        }}>
          {/* HEADER & SIDEBAR */}
          <Header
            onHamburgerPress={(page) => {
              setSidebarVisible(true);

              if (page === "drivers") {
                setHasDriver("drivers");

                // Agar drivers null bo'lsa, bo'sh object beramiz
                if (!drivers) {
                  setDrivers({});
                }
              }
            }}
            hasDriver={hasDriver}
            setHasDriver={setHasDriver}
            cashback={cashback}
            showBackButton={hasDriver === "drivers"}
            onBackPress={() => setHasDriver("main")}
          />
          <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />

          {/* DRIVER / ORDER UI */}
          {(() => {
            switch (hasDriver) {
              case "main":
                return <HomeScreen />;
              case "availableDrivers":
                return (
                  <RadarWithCars
                    drivers={availableDrivers}
                    clientId={clientId}
                    orderId={orderData}
                    size={350}
                    visible={timeSelected}
                  />
                );
              case "drivers":
                return (
                  <ActiveTaxiTracker
                    drivers={drivers}
                    clientId={clientId}
                    orderId={orderData}
                    size={350}
                    visible={timeSelected}
                  />
                );
              default:
                return null; // hech narsa ko'rsatmaslik
            }
          })()}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
