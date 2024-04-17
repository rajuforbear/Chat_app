import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {heightPercent as hp, widthPrecent as wp} from '../../utils/responsive';
interface props {
  title: string;
}
const Header: React.FC<props> = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: hp(6),
    backgroundColor: '#fff',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: wp(5),
    color: 'skyblue',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
