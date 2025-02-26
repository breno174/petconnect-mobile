// import { Tabs } from "expo-router";
// import React from "react";
// import { Platform } from "react-native";

// import { HapticTab } from "@/src/components/HapticTab";
// import { IconSymbol } from "@/src/components/ui/IconSymbol";
// import TabBarBackground from "@/src/components/ui/TabBarBackground";
// import { Colors } from "@/src/constants/Colors";
// import { useColorScheme } from "@/src/hooks/useColorScheme";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {
//             // Use a transparent background on iOS to show the blur effect
//             position: "absolute",
//           },
//           default: {},
//         }),
//       }}
//     >
//       <Tabs.Screen
//         name="login"
//         options={{
//           title: "Login",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="chevron.right" color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="forgotpassword"
//         options={{
//           title: "Forgot",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="chevron.right" color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }
