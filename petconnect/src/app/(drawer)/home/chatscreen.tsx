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
import { createClient } from "@supabase/supabase-js";

interface User {
  id: number;
  name: string;
  email: string;
}


interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserListScreen() {
  const variavable = {
    supabaseurl: process.env.EXPO_PUBLIC_API_SUPABASE_URL,
    anonkey: process.env.EXPO_PUBLIC_API_SUPABASE_ANON_KEY
  };
  if (!variavable.supabaseurl || !variavable.anonkey) {
    throw new Error("Supabase URL or Anon Key is not defined in environment variables.");
  }
  const supabase = createClient(variavable.supabaseurl, variavable.anonkey);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthUserContext);
  const [loggedUser, setLoggedUser] = useState<User>();


  useEffect(() => {
    currentUser().then((user) => setLoggedUser(user));
    const fetchUsers = async () => {
      if (!loggedUser) {
        console.error("Usuário não está logado");
        setLoading(false);
        return;
      }
      try {
        const { data: profiles, error: profilesError } = await supabase
          .from('messages')
          .select('*')
          .eq('sender_id', loggedUser.id)
          .order('created_at', { ascending: false })
        console.log(profiles);
        if (profilesError) {
          console.error("Erro ao buscar perfis:", profilesError);
          return;
        }
        const receiverIds = profiles.map((profile: any) =>
          profile.receiver_id
        );
        const uniqueReceiverIds = new Set(receiverIds);
        const allUser = await axios
          .get<User[]>("http://localhost:8080/user")
          .then((response) => {
            console.log("usuarios", response.data);
            return response.data;
          })
          .catch((error) => {
            console.error("Erro ao buscar usuários:", error);
            return [];
          })
        const filteredUsers = allUser.filter(user => uniqueReceiverIds.has(user.id));
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
      setLoading(false);
    };
    fetchUsers();
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
