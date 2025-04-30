import React from "react";
import { View, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAuthUserContext } from "@/src/context/authUserProvider";

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const { logout } = useAuthUserContext();

  return (
    <LinearGradient
      colors={["#93C5FD", "#587697"]} // Define the gradient colors
      style={styles.container}
    >
      <View style={styles.topSection}>
        <DrawerItem
          label="Fechar"
          labelStyle={{ color: "white", fontSize: 15, margin: 0 }}
          icon={() => <Ionicons name="menu" size={30} color={"white"} />}
          onPress={() => {
            router.back();
          }}
        />
      </View>
      <View style={styles.middleSection}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={styles.drawerContent}
        >
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
      <View style={styles.bottomSection}>
        <DrawerItem
          label="Configurações"
          labelStyle={{ color: "white", fontSize: 15 }}
          icon={() => <Ionicons name="settings" size={30} color={"white"} />}
          onPress={() => {}}
        />
        <DrawerItem
          label="Sair"
          labelStyle={styles.labelStyle}
          icon={() => <Ionicons name="log-out" size={24} color={"white"} />}
          onPress={() => {
            logout();
            router.replace("/auth/login");
          }}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    marginTop: 20,
    width: "100%",
  },
  middleSection: {
    flex: 1,
    width: "100%",
  },
  drawerContent: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  bottomSection: {
    paddingBottom: 20,
    justifyContent: "flex-end",
    width: "100%",
  },
  labelStyle: {
    color: "white",
    fontSize: 15,
  },
});
