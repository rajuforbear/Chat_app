import React, {useState} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import Input from '../../../components/Inputs';
import {StackScreenProps} from '@react-navigation/stack';
import {navigation_params} from '../../../navigation';
import styles from './styles';
import Button from '../../../components/Buttun';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = StackScreenProps<navigation_params, 'LOGIN_SCREEN'>;

const Login: React.FC<Props> = ({navigation}) => {
  const [focused, setFocused] = useState({
    phone: false,
    password: false,
  });

  const [inputs, setInputs] = useState({
    phone: '+91',
    password: '',
  });

  const handleOnChange = (key: string, value: string) => {
    setInputs(prev => ({...prev, [key]: value}));
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^\+91\d{10}$/; // Include "+91" at the beginning
    return phoneRegex.test(phoneNumber);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async () => {
    if (!validatePhoneNumber(inputs.phone)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
      return;
    }

    if (!validatePassword(inputs.password)) {
      Alert.alert('Invalid Password', 'Please enter a valid password.');
      return;
    }
    await AsyncStorage.setItem('phone', inputs.phone);
    navigation.reset({index: 0, routes: [{name: 'HOME_SCREEN'}]});
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.inputContainer}>
            <Input
              onChangeText={text => handleOnChange('phone', text)}
              value={inputs.phone}
              focused={focused.phone}
              onFocus={() => setFocused(prev => ({...prev, phone: true}))}
              onBlur={() => setFocused(prev => ({...prev, phone: false}))}
              placeholder="Mobile Number"
            />
            <Input
              onChangeText={text => handleOnChange('password', text)}
              value={inputs.password}
              focused={focused.password}
              onFocus={() => setFocused(prev => ({...prev, password: true}))}
              onBlur={() => setFocused(prev => ({...prev, password: false}))}
              placeholder="Password"
            />
            <Button onPress={handleLogin} title="Login" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
