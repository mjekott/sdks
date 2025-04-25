import { Image, StyleSheet, Text, View } from "react-native";

export const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>Powered by</Text>
    <Image
      source={require("../../assets/Flick.png")}
      style={styles.flickLogo}
    />
  </View>
);

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: "#666666",
  },
  flickLogo: {
    width: 40,
    height: 16,
  },
});
