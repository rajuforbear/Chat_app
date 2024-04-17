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
        dispatch({
          type: 'myChat/setContatcts',
          payload: contacts,
        });
      })
      .finally(() => {
        navigation.reset({index: 0, routes: [{name: 'HOME_SCREEN'}]});
      });
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    // Perform your refresh logic here, e.g., fetch new data from the server

    // Simulate an asynchronous operation (e.g., fetching data) using setTimeout
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
          colors={['#9Bd35A', '#689F38', 'red', 'green', 'skyblue']}
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
