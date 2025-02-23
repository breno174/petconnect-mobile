import { ThemedButton } from "@/src/components/ThemedButton";
import { ThemedInput } from "@/src/components/ThemedInput";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Image, StyleSheet, View } from "react-native";

export default function ForgotPassword() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.topSide}>
        <View style={styles.logo}>
          <Image
            source={require("@/assets/images/connect.png")}
            style={{ alignSelf: "center" }}
          />
        </View>
        <ThemedText
          type="title"
          style={[
            {
              color: styles.titleContainer.color,
              fontWeight: styles.titleContainer.fontWeight,
            },
          ]}
        >
          Recuperar Senha
        </ThemedText>
      </View>
      <View style={styles.container}>
        <ThemedInput placeholder="Email" />
        <ThemedButton type="blue" title="Enviar" />
        <ThemedButton type="light" title="Voltar" />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  topSide: {
    marginTop: "35%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    color: "#0496ff",
    fontWeight: 400,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logo: {
    height: 178,
    width: 178,
    margin: 10,
  },
});
