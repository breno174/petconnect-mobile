import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from "../drawer/CustomDrawerContent";
import { useColorScheme } from "@/src/hooks/useColorScheme";
// import { SvgXml } from "react-native-svg";
// import AddPet from '../../assets/svgs/addPet.svg'
import { Ionicons } from "@expo/vector-icons";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Nunito: require("../../../assets/fonts/Nunito-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView className="flex-1">
        <Drawer drawerContent={CustomDrawerContent}>
          <Drawer.Screen
            name="homeScreen"
             // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Match!',
              drawerLabelStyle: { color: 'white' },
              drawerIcon: () => <Ionicons name = "home" size={30} color={'white'} />,
              title: 'Home',
            }}
          />
          <Drawer.Screen
            name="account/login"
             // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Mensagens',
              drawerLabelStyle: { color: 'white' },
              drawerIcon: () => <Ionicons name = "mail" size={30} color={'white'} />,
              title: 'Mensagens',
            }}
          />
          <Drawer.Screen
            name="account/register"
             // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Pets',
              drawerLabelStyle: { color: 'white' },
              drawerIcon: () => <Ionicons name = "paw" size={30} color={'white'} />,
              title: 'Pets',
            }}
          />
          <Drawer.Screen
            name="account/forgotpassword"
             // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Novidades',
              drawerLabelStyle: { color: 'white' },
              drawerIcon: () => <Ionicons name = "newspaper" size={30} color={'white'} />,
              title: 'Novidades',
            }}
          />
          <Drawer.Screen
            name="account/forgotstep"
             // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Ajuda',
              drawerLabelStyle: { color: 'white' },
              drawerIcon: () => <Ionicons name = "help-circle-outline" size={30} color={'white'} />,
              title: 'Ajuda',
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
