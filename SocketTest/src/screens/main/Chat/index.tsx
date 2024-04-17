import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import Header from '../../../components/Header';
import {navigation_params} from '../../../navigation';
import styles from './styles';
import socketService from '../../../utils/socketServices';
import {rootState} from '../../../redux/reducers/store';
import Contacts from 'react-native-contacts';

type Props = StackScreenProps<navigation_params, 'HOME_SCREEN'>;

const Chat: React.FC<Props> = ({navigation}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const {Contact} = useSelector((state: rootState) => state.data);

  useEffect(() => {
    socketService.on('chat_message', handleChatMessage);
    return () => {
      socketService.removeListener('chat_message', handleChatMessage);
    };
  }, []);

  const handleChatMessage = useCallback(
    async (newMessage: IMessage) => {
      const receiver = await Contacts.getContactById(newMessage.user?._id);
      const currentUserID = Contact.recordID;
      // Check if the receiver ID matches the current user's ID
      if (receiver && receiver.recordID !== currentUserID) {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessage),
        );
      }
    },
    [Contact.recordID],
  );

  const onSend = useCallback((newMessages: IMessage[]) => {
    socketService.emit('chat_message', newMessages[0]);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Chat Header" />
      <GiftedChat
        user={{_id: Contact.recordID}}
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
      />
    </View>
  );
};

export default Chat;
