import React from "react";
import { StyleSheet, View } from "react-native";
import { Footer } from "./Footer";
import { PaymentHeader } from "./PaymentHeader";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      <PaymentHeader />
      <View style={styles.paymentContainer}>{children}</View>
      <Footer />
    </View>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    width: "100%",
    backgroundColor: "#F5FAF9",
  },

  paymentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  bankSelector: {
    backgroundColor: "#E9F5F4",
    padding: 12,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bankLogo: {
    width: 24,
    height: 24,
    borderRadius: 100,
  },
  chevronIcon: {
    width: 16,
    height: 16,
    tintColor: "#666",
  },
});
