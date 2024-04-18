import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';
type props = {
  onPress: () => void;
  title: string;
};
const Button: React.FC<props> = ({onPress, title}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'skyblue',
    // elevation: 4,
    borderWidth: wp(0.09),
    borderColor: 'grey',
    borderRadius: wp(1),
    marginTop: '10%',
    height: hp(5.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp(5),
  },
});
