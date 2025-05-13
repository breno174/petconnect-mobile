import React, { useCallback, useEffect, useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { createClient } from "@supabase/supabase-js";
import { AuthUserContext } from "@/src/context/authUserProvider";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
interface User {
  id: number;
  name: string;
  email: string;
}

export default function ChatScreen() {
  const { currentUser } = useContext(AuthUserContext);
  const [loggedUser, setLoggedUser] = useState<User>();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    currentUser().then((dbuser) => setLoggedUser(dbuser));

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Erro ao buscar mensagens:", error);
      else {
        const formatted = data.map((msg) => ({
          _id: msg.id,
          text: msg.text,
          createdAt: new Date(msg.created_at),
          user: {
            _id: msg.user_id,
            name: msg.user_name,
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
          const newMsg = {
            _id: msg.id,
            text: msg.text,
            createdAt: new Date(msg.created_at),
            user: {
              _id: msg.user_id,
              name: msg.user_name,
            },
          };
          setMessages((prev) => GiftedChat.append(prev, [newMsg]));
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      const msg = newMessages[0];
      const { text, user } = msg;

      const { error } = await supabase.from("messages").insert([
        {
          text,
          user_id: loggedUser?.id,
          user_name: loggedUser?.name || "Usuário",
        },
      ]);

      if (error) console.error("Erro ao enviar mensagem:", error);
    },
    [loggedUser]
  );

  return (
    <View style={styles.container}>
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
});
