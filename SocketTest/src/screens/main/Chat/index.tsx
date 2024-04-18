import React, {useCallback, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {
  GiftedChat,
  IMessage,
  Bubble,
  InputToolbar,
} from 'react-native-gifted-chat';
import Header from '../../../components/Header';
import {navigation_params} from '../../../navigation';
import styles from './styles';
import socketService from '../../../utils/socketServices';
import {rootState} from '../../../redux/reducers/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../utils/responsive';

type Props = StackScreenProps<navigation_params, 'HOME_SCREEN'>;

const Chat: React.FC<Props> = ({navigation}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const {Contact} = useSelector((state: rootState) => state.data);
  console.log(Contact);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    socketService.on('chat_message', handleChatMessage);
    return () => {
      socketService.removeListener('chat_message', handleChatMessage);
    };
  }, []);

  useEffect(() => {
    getNumber();
  }, []);

  const getNumber = async () => {
    const phone = await AsyncStorage.getItem('phone');
    phone ? setPhone(phone) : null;
  };

  const handleChatMessage = useCallback(
    async (newMessage: IMessage) => {
      const receiver = newMessage.receiver;
      const user = phone.replace(/\+91|\s/g, '');
      const friend = Contact.phoneNumbers[0].number.replace(/\+91|\s/g, '');

      // Check if the message is between the two desired users
      if (
        (receiver == user && newMessage.user._id == friend) ||
        (receiver == friend && newMessage.user._id == user)
      ) {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessage),
        );
      }
    },
    [phone, Contact.phoneNumbers[0].number],
  );

  const onSend = useCallback((newMessages: IMessage[]) => {
    const currentUserPhoneNumber = Contact.phoneNumbers[0].number.replace(
      /\+91|\s/g,
      '',
    );
    const newmsg: IMessage = {
      ...newMessages[0],
    };
    socketService.emit('chat_message', {
      receiver: currentUserPhoneNumber, // Fix typo here
      ...newmsg,
    }); // Emit the new message to the server
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Chat Header" />
      <GiftedChat
        user={{_id: phone.replace(/\+91|\s/g, '')}}
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        renderMessage={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: 'grey',
                  marginVertical: hp(1),
                  marginLeft: '2%',
                },
                right: {
                  backgroundColor: 'lightgreen',
                  marginVertical: hp(1),
                  marginRight: '2%',
                },
              }}
              textStyle={{
                left: {
                  color: 'white',
                  fontSize: wp(4),
                },
              }}
            />
          );
        }}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              primaryStyle={{
                alignItems: 'center',
              }}
              accessoryStyle={{paddingRight: wp(8)}}
            />
          );
        }}
      />
    </View>
  );
};

export default Chat;
