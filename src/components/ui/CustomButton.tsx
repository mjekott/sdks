import React, { ComponentProps } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

type CustomButtonProps = ComponentProps<typeof Pressable> & {
  title: string;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
};

const CustomButton = ({
  title,
  style,
  isLoading,
  disabled,
  ...props
}: CustomButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      style={[styles.button, style, disabled && styles.disabled]}
      {...props}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {isLoading ? <ActivityIndicator color="white" /> : title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: "#2A9D8F",
    width: "100%",
    padding: 16,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#228985",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    backgroundColor: "#E0E0E0",
    borderColor: "#E0E0E0",
  },
  disabledText: {
    color: "#9E9E9E",
  },
});
