import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Contatcs from 'react-native-contacts';
import {useDispatch} from 'react-redux';
import {navigation_params} from '../../../navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
type props = StackScreenProps<navigation_params, 'SPLASH_SCREEN'>;
const Splash: React.FC<props> = ({navigation}) => {
  useEffect(() => {
    const cler = setTimeout(() => {
      initial();
    }, 1500);
  }, []);
  const initial = async () => {
    await askPermission();
  };
  const dispatch = useDispatch();
  const askPermission = async () => {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'The app requires contact access for messaging',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        },
      );

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        getContacts();
      } else if (result === PermissionsAndroid.RESULTS.DENIED) {
        console.log('Contact access denied');
      } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('Contact access denied with never ask again');
      }
    } catch (error) {
      console.error('Error requesting contact permission:', error);
    }
  };
  const getContacts = () => {
    Contatcs.getAll()
      .then(contacts => {
        // dispatch({
        //   type: 'myChat/setContatcts',
        //   payload: contacts,
        // });
        const filtered = contacts.filter(item => item.phoneNumbers.length > 0);
        dispatch({
          type: 'myChat/setContatcts',
          payload: filtered,
        });
      })
      .finally(async () => {
        const phone = await AsyncStorage.getItem('phone');
        navigation.reset({
          index: 0,
          routes: [{name: phone ? 'HOME_SCREEN' : 'LOGIN_SCREEN'}],
        });
      });
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false); // Finish refreshing
    }, 5000); // Adjust the duration as needed
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#9Bd35A', '#689F38', 'red', 'green', 'skyblue', 'borwn']}
          progressBackgroundColor="#FFFFFF"
        />
      }>
      <View style={{flex: 1}}>
        <Text>rnew</Text>
      </View>
    </ScrollView>
  );
};

export default Splash;

const styles = StyleSheet.create({});
