import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

export type TypeThemedButton = {
  title: string;
  type: "blue" | "light" | "red" | "blue-small";
  onPress?: () => void;
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
        type === "red" ? styles.redButton : undefined,
        type === "blue-small" ? styles.defaultSmall : undefined,
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
          type === "red"
            ? {
              color: styles.redButton.color,
              fontSize: styles.redButton.fontSize,
            }
            : undefined,
          type === "blue-small"
            ? {
              color: styles.defaultSmall.color,
              fontSize: styles.defaultSmall.fontSize,
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
  defaultSmall: {
    borderRadius: 50,
    width: 100,
    height: 30,
    backgroundColor: "#0496ff",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
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
  redButton: {
    borderRadius: 50,
    width: 80,
    height: 30,
    backgroundColor: "red",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    marginTop: 5,
  },
});
