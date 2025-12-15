// timeModalStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "#0000007d",
        justifyContent: "flex-end",
    },

    modalBox: {
        backgroundColor: "#101820",
        color: "#fff",
        padding: 10,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        elevation: 20,
    },

    modalTitle: {
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 7,
        textAlign: "center", color: "#00ff7f",

    },

    timeBtn: {
        backgroundColor: "#00ff7f",
        paddingVertical: 15,
        paddingTop: 7,
        paddingBottom: 7,
        width: "89%",
        borderRadius: 12,
        alignItems: "center",
        elevation: 5,
        shadowColor: "#00000082f7f",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },

    timeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        gap: 10,
    },
    timeBtnText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000000b2",
    },

    cancelBtn: {
        color: "#ff3b3b",
        borderColor: "#ff3b3b",
        borderWidth: 2,
        width: 30,
        height: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },

    cancelBtnText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
    },
    card: {
        width: 100,
        height: 70,
        marginRight: 12,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        paddingBottom: 18,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#ffffff",
        position: "relative",
    },

    activeCard: {
        borderColor: "#00ff7f",
        backgroundColor: "#ffffff",
    },

    image: {
        width: 95,
        height: 95,
        resizeMode: "contain",
        marginBottom: 5,
    },

    label: {
        fontSize: 13,
        fontWeight: "500",
        color: "#101820",
        position: "absolute",
        bottom: 0,
        textAlign: "center",
        textTransform: "capitalize",
    },

    activeLabel: {
        color: "#00ff7f",
        fontWeight: "700",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 10,
        gap: 12,
    },

    serviceBtn: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingBottom: 7,
        paddingTop: 7,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: "#ddd",
        alignItems: "center",
    },

    activeService: {
        borderColor: "#00ff7f",
        backgroundColor: "#ffffff",
    },

    serviceLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#444",
    },







    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        overflow: "hidden",

        marginVertical: 8,
        backgroundColor: "#fff",
    },
    picker: {
        height: 40,
        width: "100%",
        color: "#333",        // text rangi
        paddingHorizontal: 0,
    },





    // ============================
    scrollContainer_li: {
        marginBottom: 10,
    },
    picker_li: {
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 12,
        paddingVertical: 3,
        borderRadius: 8,
        marginRight: 8,
        minWidth: 80,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    activeCard_li: {
        backgroundColor: "#00ff7f",
        borderColor: "#00ff7f",

    },
    serviceText_li: {
        fontSize: 12,
        color: '#333',
        fontWeight: '500',
    },
    priceText_li: {
        fontSize: 11,
        color: '#666',
    },
    activeLabel_li: {
        color: '#333',
        fontWeight: '600',
    },
    // ============================
    // SliderStyles.js ga qo'shing:

    mapContainer: {
        width: "100%",
        // height: 200,
        borderRadius: 15,
        overflow: "hidden",
        marginBottom: 10,
        backgroundColor: "#f0f0f0",
    },
    map: {
        width: "100%",
        height: "100%",
    },
    mapLoading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
    },
    mapLoadingText: {
        marginTop: 10,
        fontSize: 14,
        color: "#666",
    },
    mapError: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff3f3",
    },
    mapErrorText: {
        fontSize: 14,
        color: "#e74c3c",
    },
    markerContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    markerDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#00ff7f",
        borderWidth: 3,
        borderColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    markerPulse: {
        position: "absolute",
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(74, 144, 226, 0.3)",
    },
    webLocationInfo: {
        borderColor: "#00ff7f",
        borderWidth: 2,
        borderRadius: 16,
        shadowColor: "#000",
        overflow: "hidden",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        height: 190,
        alignItems: "center",
        justifyContent: "center",
    },
    locationText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#333",
    },
});
