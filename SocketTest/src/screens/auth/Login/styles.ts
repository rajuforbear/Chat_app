import {StyleSheet} from 'react-native';
import {
  widthPrecent as wp,
  heightPercent as hp,
} from '../../../utils/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: wp(4),
    marginTop: '12%',
    marginVertical: hp(5),
  },
  title: {
    marginLeft: wp(2),
    alignSelf: 'center',
    fontSize: wp(8),
    color: 'black',
    fontWeight: 'bold',
    marginTop: '5%',
  },
  card: {
    backgroundColor: 'white',
    marginTop: '50%',
    marginHorizontal: wp(4),
    elevation: 5,
    borderRadius: wp(3),
  },
});
