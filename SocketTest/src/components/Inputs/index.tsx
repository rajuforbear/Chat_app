import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {} from 'react-native-gesture-handler';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';
type props = {
  placeholder: string;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  focused: boolean;
  value: string;
};

const Input: React.FC<props> = ({
  placeholder,
  onChangeText,
  onFocus,
  onBlur,
  focused,
  value,
}) => {
  return (
    <View>
      {/* <Text style={styles.title}>Mobile Number</Text> */}
      <View
        style={[
          styles.inputContainer,
          {elevation: focused ? 1 : 0, borderWidth: focused ? 0 : wp(0)},
        ]}>
        <TextInput
          placeholder={placeholder}
          value={value}
          placeholderTextColor={'lightgrey'}
          onChangeText={text => onChangeText(text)}
          style={styles.input}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  title: {
    fontSize: wp(5.5),
  },
  inputContainer: {
    backgroundColor: 'white',
    // elevation: 4,
    borderWidth: wp(0.09),
    borderColor: 'grey',
    borderRadius: wp(1),
    marginTop: '10%',
  },
  input: {
    height: hp(6),
    fontSize: wp(4.5),
    paddingLeft: wp(4),
    color: 'grey',
  },
});
