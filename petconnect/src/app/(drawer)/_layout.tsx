import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "../drawer/CustomDrawerContent";
import { useColorScheme } from "@/src/hooks/useColorScheme";
// import { SvgXml } from "react-native-svg";
// import AddPet from '../../assets/svgs/addPet.svg'
import { Ionicons } from "@expo/vector-icons";
import { AuthUserContext } from "@/src/context/authUserProvider";
import { Redirect } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function DrawerLayout() {
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

  const authUserContext = useContext(AuthUserContext);

  if (!authUserContext) {
    //!!!!! HANDLE AUTHCONTEXT NOT AVAILABLE !!!!!
    return <Redirect href="/auth/login" />;
  }

  const { isAuthenticated } = authUserContext;

  return isAuthenticated ? (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView className="flex-1">
        <Drawer drawerContent={CustomDrawerContent}>
          <Drawer.Screen
            name="homeScreen"
            // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Match!",
              drawerLabelStyle: { color: "white" },
              drawerIcon: () => (
                <Ionicons name="home" size={30} color={"white"} />
              ),
              title: "Home",
            }}
          />
          <Drawer.Screen
            name="auth/login"
            // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Mensagens",
              drawerLabelStyle: { color: "white" },
              drawerIcon: () => (
                <Ionicons name="mail" size={30} color={"white"} />
              ),
              title: "Mensagens",
            }}
          />
          <Drawer.Screen
            name="auth/register"
            // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Pets",
              drawerLabelStyle: { color: "white" },
              drawerIcon: () => (
                <Ionicons name="paw" size={30} color={"white"} />
              ),
              title: "Pets",
            }}
          />

          <Drawer.Screen
            name="auth/forgotpassword"
            // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Novidades",
              drawerLabelStyle: { color: "white" },
              drawerIcon: () => (
                <Ionicons name="newspaper" size={30} color={"white"} />
              ),
              title: "Novidades",
            }}
          />
          <Drawer.Screen
            name="auth/forgotstep"
            // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Ajuda",
              drawerLabelStyle: { color: "white" },
              drawerIcon: () => (
                <Ionicons
                  name="help-circle-outline"
                  size={30}
                  color={"white"}
                />
              ),
              title: "Ajuda",
            }}
          />
          <Drawer.Screen
            name="home/petprofile"
            // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "PetProfile",
              drawerLabelStyle: { color: "white" },
              drawerIcon: () => (
                <Ionicons name="add" size={30} color={"white"} />
              ),
              title: "PetProfile",
            }}
          />
          <Drawer.Screen
            name="home/registerpet"
            // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Pet Register",
              drawerLabelStyle: { color: "white" },
              drawerIcon: () => (
                <Ionicons name="paw" size={30} color={"white"} />
              ),
              title: "Pet Register",
            }}
          />
          <Drawer.Screen
            name="home/chatscreen"
            // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Chat Screen",
              drawerLabelStyle: { color: "white" },
              drawerIcon: () => (
                <Ionicons name="chatbubble-ellipses" size={30} color={"white"} />
              ),
              title: "Chat Screen",
            }}
          />
          <Drawer.Screen
            name="home/chatscreenconversation"
            // This is the name of the page and must match the url from root
            options={{
              title: "Chat Screen Conversation",
              drawerItemStyle: { display: "none" }
            }}
          />
          
          <Drawer.Screen
            name="home/userdata"
            // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "UserData",
              drawerLabelStyle: { color: "white" },
              drawerIcon: () => (
                <Ionicons name="person" size={30} color={"white"} />
              ),
              title: "UserData",
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </ThemeProvider>
  ) : (
    <Redirect href="/auth/login" />
  );
}
