import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome'; // Certifique-se de instalar essa lib
import { Entypo } from "@expo/vector-icons";

type TypeThemedInput = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  children?: React.ReactNode;
  secureTextEntry?: boolean;
};

export function ThemedInput({ placeholder, children, value, onChangeText, secureTextEntry }: TypeThemedInput) {
  const [text, setText] = useState("");

  return (
    <View style={styles.inputContainer}>
      {/* <Entypo name="mail" size={25} style={styles.icon} /> */}
      <View style={styles.iconWrapper}>
        {children}
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#777"
        value={value}
        onChangeText={onChangeText}
        selectionColor="#fff"
        secureTextEntry={secureTextEntry}
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
    margin: 8,
    width: "75%",
    height: 45,
    overflow: "hidden",
    position: "relative",
  },
  iconWrapper: {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: [{ translateY: -12.5 }],
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 25,
  },
  input: {
    flex: 1,
    borderRadius:15,
    width:"75%",
    color: "black",
    fontSize: 17,
    fontWeight: "600",
    paddingLeft: 45,
    paddingRight: 10,
    height: "100%",
  },
});
