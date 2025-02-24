import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/src/components/HelloWave";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import Login from "./login";
import ForgotPassword from "./forgotpassword";
import Register from "./register";


import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator()

export default function HomeScreen() {
  return (
  
    <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="forgotpassword" component={ForgotPassword} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
