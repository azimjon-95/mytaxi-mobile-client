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

  useEffect(() => {

    const loadSaved = async () => {
      try {
        const value = JSON.parse(await AsyncStorage.getItem("activeOrderStatus"));
        const clientData = JSON.parse(await AsyncStorage.getItem("userData"));
        if (value) setOrderData(value?.order._id);
        if (clientData) setClientId(clientData?._id);
      } catch (e) {
        Notification(`Ma'lumotlarni yuklashda xatolik: ${e}`, "error");

      }
    };

    loadSaved();
  }, []);
  const { data: apiData, isLoading, refetch } = useGetAvailableDriversQuery(
    {
      clientId: clientId,
      orderId: orderData,
    },
  );


  // 🔥 1. Statusni boshqaradigan umumiy handler
  const handleStatusUpdate = async (data) => {
    const status = data?.status;
    if (status === "main") {
      await AsyncStorage.removeItem("activeOrderStatus");
      setAvailableDrivers([]);
      setDrivers(null);
      setHasDriver("main");
      setTimeSelected(false);
      return
    }
    else if (status === "availableDrivers") {
      setAvailableDrivers(data.availableDrivers || []);
      setDrivers(null);
      setHasDriver("availableDrivers");
      return
    }
    else if (status === "driver") {
      setDrivers(data.driver || null);
      setAvailableDrivers(data.availableDrivers || []);
      setHasDriver(status);
      return
    }
    // else {
    //   setAvailableDrivers([]);
    //   setDrivers(null);
    //   setHasDriver("main");
    //   setTimeSelected(false);
    // }
  };
  useEffect(() => {
    const innerData = apiData?.innerData;
    handleStatusUpdate(innerData);
  }, [apiData]);

  useEffect(() => {
    socket.on("availableDriversUpdate", () => {
      refetch();
    });
    return () => socket.off("availableDriversUpdate");
  }, [refetch]);


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

              if (page === "driver") {
                setHasDriver("driver");

                // Agar drivers null bo'lsa, bo'sh object beramiz
                if (!drivers) {
                  setDrivers({});
                }
              }
            }}
            hasDriver={hasDriver}
            setHasDriver={setHasDriver}
            cashback={cashback}
            showBackButton={hasDriver === "driver"}
            onBackPress={() => setHasDriver("main")}
          />
          <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />

          {/* DRIVER / ORDER UI */}
          {(() => {
            switch (hasDriver) {
              case "main":
                return <HomeScreen setHasDriver={setHasDriver} />;
              case "availableDrivers":
                return (
                  <RadarWithCars
                    drivers={availableDrivers}
                    clientId={clientId}
                    orderId={orderData}
                    size={350}
                    visible={timeSelected}
                    setHasDriver={setHasDriver}
                  />
                );
              case "driver":
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
