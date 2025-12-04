// styles.js (updated - sidebar stillari olib tashlandi)
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#101820",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    hamburgerBtn: {
        padding: 0,
    },
    hamburgerLine: {
        width: 30,
        height: 3,
        backgroundColor: "#FFC400",
        marginVertical: 3,
        borderRadius: 2,
    },
    cashbackBadge: {
        backgroundColor: "rgba(255,196,0,0.2)",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#FFC400",
    },
    cashbackText: {
        color: "#FFC400",
        fontSize: 14,
        fontWeight: "bold",
    },
    title: {
        fontSize: 45,
        fontWeight: "900",
        color: "#FFC400",
        marginTop: 40,

        textAlign: "center",
        textShadowColor: "rgba(255,194,0,0.6)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    titleComming: {
        fontSize: 20,
        fontWeight: "900",
        color: "#00ff7f",
        textAlign: "center",
        // textShadowColor: "#00ff7f",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    orderBtn: {
        backgroundColor: "#FFC400",
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderRadius: 20,
        width: "89%",
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 35,

        // Android shadow
        elevation: 10,

        // iOS shadow
        shadowColor: "#FFC400",
        shadowOffset: { width: 0, height: 5 },

        shadowOpacity: 0.4,
        shadowRadius: 5,
    },

    orderBtnText: {
        fontSize: 22,
        includeFontPadding: false, // Android uchun
        textAlign: "center",
        fontWeight: "800",
        color: "#101820",
    },

    // QO'NG'IROQ TUGMASI
    callBtn: {
        backgroundColor: "#ffffff91",
        marginHorizontal: 20,
        paddingVertical: 16,
        marginTop: 20,
        borderRadius: 15,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginBottom: 20,
    },
    callBtnText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000",
    },
    callBtnSubtext: {
        fontSize: 12,
        textAlign: "center",
        color: "#000",
        marginTop: 4,
        opacity: 0.9,
    },
    infoSection: {
        marginBottom: 0,
    },
    // MA'LUMOT QUTISI
    infoBox: {
        backgroundColor: "#ffffff91",
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 15,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#232323",
        marginBottom: 12,
    },
    infoText: {
        fontSize: 14,
        color: "#000000",
        marginBottom: 6,
        lineHeight: 20,
    },

    // MODAL
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalBox: {
        backgroundColor: "#101820",
        padding: 20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: "#FFC400",
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 15,
        textAlign: "center",
        color: "#FFC400",
    },
    timeBtn: {
        backgroundColor: "#FFC400",
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        alignItems: "center",
    },
    timeBtnText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#101820",
    },
    cancelBtn: {
        backgroundColor: "rgba(255,196,0,0.2)",
        borderWidth: 1,
        borderColor: "#FFC400",
    },
    cancelBtnText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#FFC400",
    },

    selectedTaxiContainer: {
        alignSelf: 'center',
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f0f8ff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#00ff7f',
        width: '90%',
        alignItems: 'center',
    },
    selectedTaxiTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00ff7f',
        marginBottom: 10,
    },
    taxiCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    taxiName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    taxiCar: {
        fontSize: 14,
        color: '#666',
        marginBottom: 3,
    },
    taxiRating: {
        fontSize: 14,
        color: '#00ff7f',
        marginBottom: 3,
    },
    taxiDistance: {
        fontSize: 12,
        color: '#999',
        marginBottom: 3,
    },
    taxiPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff6b35',
    },
});