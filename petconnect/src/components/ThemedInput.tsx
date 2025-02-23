import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome'; // Certifique-se de instalar essa lib
import { Entypo } from "@expo/vector-icons";

type TypeThemedInput = {
  placeholder: string;
};

export function ThemedInput({ placeholder }: TypeThemedInput) {
  const [text, setText] = useState("");

  return (
    <View style={styles.inputContainer}>
      <Entypo name="mail" size={25} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#777"
        value={text}
        onChangeText={setText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e4e4e4",
    borderRadius: 15,
    paddingHorizontal: 10,
    margin: 10,
    width: "75%",
    height: 45,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 17,
    fontWeight: 600,
    alignContent: "center",
  },
});
