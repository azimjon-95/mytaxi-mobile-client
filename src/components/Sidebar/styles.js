// sidebarStyles.js (yangi fayl - sidebar stillari bu yerga ko'chirildi)
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    // SIDEBAR
    sidebarOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    sidebar: {
        width: 300,
        height: "100%",
        backgroundColor: "#101820",
        borderRightWidth: 1,
        borderRightColor: "rgb(0, 255, 127)",
    },
    userSection: {
        padding: 20,
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,196,0,0.2)",
        alignItems: "center",
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "rgb(0, 255, 127)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#101820",
    },
    userName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "rgb(0, 255, 127)",
        marginBottom: 4,
    },
    userPhone: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.7)",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,196,0,0.1)",
    },
    menuIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    menuText: {
        fontSize: 16,
        color: "rgb(0, 255, 127)",
        fontWeight: "600",
    },
    cashbackAmount: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.7)",
        marginTop: 2,
    },
    historySection: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,196,0,0.2)",
    },
    historyTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "rgb(0, 255, 127)",
        marginBottom: 12,
    },
    historyCard: {
        backgroundColor: "rgba(255,196,0,0.05)",
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "rgba(255,196,0,0.2)",
    },
    historyHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    historyDate: {
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.6)",
    },
    historyCashback: {
        fontSize: 12,
        color: "rgb(0, 255, 127)",
        fontWeight: "bold",
    },
    historyRoute: {
        fontSize: 14,
        color: "rgb(0, 255, 127)",
        marginBottom: 4,
    },
    historyPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "rgb(0, 255, 127)",
    },
    logoutItem: {
        borderBottomWidth: 0,
        marginTop: 20,
    },
    logoutText: {
        color: "#ff4444",
    },

    // SIDEBAR MENU SUBTEXT
    menuSubtext: {
        fontSize: 12,
        color: "#2196F3",
        marginTop: 2,
        fontWeight: "bold",
    },
});