import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

export type TypeThemedButton = {
  title: string;
  type: "blue" | "light";
  onPress: () => void;
};

export function ThemedButton({
  title,
  type = "blue",
  onPress,
}: TypeThemedButton) {
  return (
    <TouchableOpacity
      style={[
        type === "blue" ? styles.default : undefined,
        type === "light" ? styles.lightButton : undefined,
      ]}
      onPress={onPress}
    >
      <ThemedText
        type="defaultSemiBold"
        style={[
          type === "blue"
            ? { color: styles.default.color, fontSize: styles.default.fontSize }
            : undefined,
          type === "light"
            ? {
                color: styles.lightButton.color,
                fontSize: styles.lightButton.fontSize,
              }
            : undefined,
        ]}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  default: {
    borderRadius: 50,
    width: 220,
    padding: 10,
    backgroundColor: "#0496ff",
    color: "#fff",
    alignItems: "center",
    fontSize: 18,
    margin: 8,
  },
  lightButton: {
    borderRadius: 50,
    width: 220,
    paddingTop: 10,
    backgroundColor: "#fff",
    color: "#0496ff",
    alignItems: "center",
    fontSize: 18,
    margin: 8,
  },
});
