import React, { useCallback, useEffect, useState, useContext } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { createClient } from "@supabase/supabase-js";
import { AuthUserContext } from "@/src/context/authUserProvider";
// import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";
import { useLocalSearchParams, useRouter } from "expo-router";

const variavable = {
  supabaseurl: process.env.EXPO_PUBLIC_API_SUPABASE_URL,
  anonkey: process.env.EXPO_PUBLIC_API_SUPABASE_ANON_KEY
};

if (!variavable.supabaseurl || !variavable.anonkey) {
  throw new Error("Supabase URL or Anon Key is not defined in environment variables.");
}
try {
  new URL(variavable.supabaseurl);
} catch (err) {
  throw new Error(`Invalid Supabase URL: ${variavable.supabaseurl}`);
}

const supabase = createClient(variavable.supabaseurl, variavable.anonkey);
interface User {
  id: number;
  name: string;
  email: string;
}

export default function ChatScreen() {
  const router = useRouter();
  const { currentUser } = useContext(AuthUserContext);
  const [loggedUser, setLoggedUser] = useState<User>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  // Pegando o ID do usuário com quem estamos conversando via rota
  const { userId: chatWithUserIdRaw } = useLocalSearchParams();
  const chatWithUserId = Number(chatWithUserIdRaw);

  useEffect(() => {
    currentUser().then((dbuser) => setLoggedUser(dbuser));
  }, []);

  useEffect(() => {
    console.log('Logged User:', loggedUser);

    if (!loggedUser || !chatWithUserId) return;
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${loggedUser.id},receiver_id.eq.${chatWithUserId}),and(sender_id.eq.${chatWithUserId},receiver_id.eq.${loggedUser.id})`
        )
        .order("created_at", { ascending: true });
      if (error) {
        console.error("Erro ao buscar mensagens:", error);
      } else {
        const formatted = data.map((msg) => ({
          _id: msg.id,
          text: msg.text,
          createdAt: new Date(msg.created_at),
          user: {
            _id: msg.sender_id,
            name: msg.sender_name,
          },
        }));
        setMessages(formatted);
      }
    };
    fetchMessages();
    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const msg = payload.new;
          const isRelevant =
            (msg.sender_id === loggedUser.id &&
              msg.receiver_id === chatWithUserId) ||
            (msg.sender_id === chatWithUserId &&
              msg.receiver_id === loggedUser.id);

          if (!isRelevant) return;
          const newMsg = {
            _id: msg.id,
            text: msg.text,
            createdAt: new Date(msg.created_at),
            user: {
              _id: msg.sender_id,
              name: msg.sender_name,
            },
          };
          setMessages((prev) => GiftedChat.append(prev, [newMsg]));
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [loggedUser, chatWithUserId]);

  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      const msg = newMessages[0];
      const { error } = await supabase.from("messages").insert([
        {
          text: msg.text,
          sender_id: loggedUser?.id,
          sender_name: loggedUser?.name || "Usuário",
          receiver_id: chatWithUserId,
        },
      ]);
      if (error) console.error("Erro ao enviar mensagem:", error);
    },
    [loggedUser, chatWithUserId]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>{"< Voltar"}</Text>
        </Pressable>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: loggedUser?.id ?? "unknown",
          name: loggedUser?.name || "Usuário",
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#ffffff",
  },
  backText: {
    fontSize: 16,
    color: "#007AFF",
  },
});
