import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { router, useNavigation } from "expo-router";
import axios from "axios";
import { AuthUserContext } from "@/src/context/authUserProvider";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserListScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthUserContext);

  useEffect(() => {
    currentUser().then((user) => console.log(user));

    axios
      .get<User[]>("http://localhost:8080/user")
      .then((response) => {
        console.log("usuarios", response.data);

        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  function clickUser(item: User) {
    console.log("usuario clickado", item);
    router.push(`/home/chatscreenconversation/${item.id}`);
  }

  return (
    <>
      {users.length === 0 ? (
        <View style={styles.container}>
          <Text>Não há usuários cadastrados</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={users}
            keyExtractor={(item) => item?.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Pressable onPress={() => clickUser(item)}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text>{item.email}</Text>
                </Pressable>
              </View>
            )}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center" },
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  item: { marginBottom: 16, borderBottomWidth: 1, paddingBottom: 8 },
  name: { fontWeight: "bold", fontSize: 16 },
});
