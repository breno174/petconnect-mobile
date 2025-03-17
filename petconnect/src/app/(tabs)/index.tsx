// import Login from "./login";
// import ForgotPassword from "./forgotpassword";
// import Register from "./register";
// import ForgotStep from "./forgotstep";
// import { createStackNavigator } from "@react-navigation/stack";
// import { useRouter } from "expo-router";
// import { useEffect } from "react";
import { HelloWave } from "@/src/components/HelloWave";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import Login from "./login";
import ForgotPassword from "./forgotpassword";
// import Register from "./register";


import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator()

export default function HomeScreen() {
  return (
  
    <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="forgotpassword" component={ForgotPassword} />
      { /**<Stack.Screen name="register" component={Register} /> */}
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>

  );
}
// export type RootStackParamList = {
//   login: undefined;
//   forgotpassword: undefined;
//   forgotstep: undefined;
//   register: undefined;
//   Home: undefined;
// };

// const Stack = createStackNavigator<RootStackParamList>();

// export default function HomeScreen() {
//   return (
//     <Stack.Navigator
//       initialRouteName="login"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="login" component={Login} />
//       <Stack.Screen name="forgotpassword" component={ForgotPassword} />
//       <Stack.Screen name="register" component={Register} />
//       <Stack.Screen name="forgotstep" component={ForgotStep} />
//     </Stack.Navigator>
//   );
// }
