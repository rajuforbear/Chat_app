import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';
import socketService from './src/utils/socketServices';
import Tts from 'react-native-tts';
import Root from './src/navigation';
import {Provider} from 'react-redux';
import store from './src/redux/reducers/store';
// Import the socketService instance

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  // useEffect(() => {
  //   // Listen for incoming chat messages
  //   socketService.on('chat_message', handleChatMessage);

  //   // Cleanup: remove the event listener when component unmounts
  //   return () => {
  //     socketService.removeListener('chat_message', handleChatMessage);
  //   };
  // }, []);

  // const handleChatMessage = (message: any) => {
  //   // Update the messages state with the new message

  //   setMessages(prevMessages => [...prevMessages, message]);
  // };

  // const sendMessage = () => {
  //   // Emit the "chat_message" event with the message datra
  //   socketService.emit('chat_message', message);
  //   setMessage(''); // Clear the message input field after sending
  // };

  return (
    // <View style={{flex: 1, padding: 10}}>

    // </View>
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default ChatScreen;
