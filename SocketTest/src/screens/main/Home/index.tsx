import {View, Text} from 'react-native';
import React from 'react';
import Header from '../../../components/Header';
import List from '../../../components/List';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../../redux/reducers/store';
import {Contact} from 'react-native-contacts';
import {StackScreenProps} from '@react-navigation/stack';
import {navigation_params} from '../../../navigation';
type props = StackScreenProps<navigation_params, 'HOME_SCREEN'>;
const Home: React.FC<props> = ({navigation}) => {
  const dispatch = useDispatch();
  const {MyContacs, screens} = useSelector((state: rootState) => state.data);
  const onPress = (contact: Contact) => {
    dispatch({
      type: 'myChat/getContact',
      payload: contact,
    });
    navigation.navigate('CHAT_SCREEN');
  };

  return (
    <View style={styles.container}>
      <Header title="HOME HEADER" />
      <List onPress={onPress} data={MyContacs} />
    </View>
  );
};

export default Home;
