import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const PaymentHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Pay by Bank</Text>
    <View style={styles.securityIcons}>
      <Image
        source={require("../../assets/Monzo.png")}
        style={styles.securityIcon}
      />
      <Image
        source={require("../../assets/Revolut.png")}
        style={styles.securityIcon}
      />
      <Image
        source={require("../../assets/Natvest.png")}
        style={styles.securityIcon}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2A9D8F",
  },
  securityIcons: {
    flexDirection: "row",
    gap: 8,
  },
  securityIcon: {
    width: 24,
    height: 24,
  },
});
