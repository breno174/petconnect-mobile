import React, { useCallback, useEffect, useState } from 'react';
import {View, StyleSheet} from "react-native";
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
// import { collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
// import {db} from '@/firebaseConfig' 

export default function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  // useEffect(() => {
  //   const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const msgs = snapshot.docs.map((doc) => {
  //       const data = doc.data();
  //       return {
  //         _id: doc.id,
  //         text: data.text,
  //         createdAt: data.createdAt.toDate(),
  //         user: data.user,
  //       };
  //     });
  //     setMessages(msgs);
  //   });

  //   return () => unsubscribe();
  // }, []);
  useEffect(() => {
    // Mensagens simuladas para teste
    setMessages([
      {
        _id: '1',
        text: 'Olá! Isso é uma mensagem de teste.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
        },
      },
      {
        _id: '2',
        text: 'Bem-vindo ao chat!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
        },
      },
    ]);
  }, []);


  // const onSend = useCallback(async (messages: IMessage[] = []) => {
  //   const { _id, createdAt, text, user } = messages[0];
  //   await addDoc(collection(db, 'messages'), {
  //     _id,
  //     createdAt,
  //     text,
  //     user,
  //   });
  // }, []);
  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

  return (
    

    <View style={styles.container}>
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
        name: 'Usuário',
      }}
    />
  </View>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // <- Aqui define o fundo do chat
  },
});

