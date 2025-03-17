<<<<<<< HEAD
import React, { useState } from "react";
=======
import React from "react";
>>>>>>> develop
import { View, TextInput, StyleSheet } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome'; // Certifique-se de instalar essa lib
import { Entypo } from "@expo/vector-icons";

type TypeThemedInput = {
  placeholder: string;
  value: string;
<<<<<<< HEAD
  onChangeText: (text: string) => void; 
  children?: React.ReactNode;
  secureTextEntry?: boolean;
};

export function ThemedInput({ placeholder, children, value, onChangeText, secureTextEntry}: TypeThemedInput) {
  const [text, setText] = useState("");

=======
  onChangeText: (text: string) => void;
  children?: React.ReactNode;
};

export function ThemedInput({
  placeholder,
  value,
  onChangeText,
  children,
}: TypeThemedInput) {
>>>>>>> develop
  return (
    <View style={styles.inputContainer}>
      {/* <Entypo name="mail" size={25} style={styles.icon} /> */}
      {children}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#777"
        value={value}
        onChangeText={onChangeText}
<<<<<<< HEAD
        selectionColor="#fff" 
        secureTextEntry={secureTextEntry}
=======
>>>>>>> develop
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
<<<<<<< HEAD
    overflow: "hidden",
  },
   input: {
    flex: 1,
    color: "black",
    fontSize: 17,
    fontWeight: 600,
    alignContent: "center",
    borderRadius: 15,
=======
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 17,
    fontWeight: 600,
    alignContent: "center",
>>>>>>> develop
  },
});
