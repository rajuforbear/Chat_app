import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Contact} from 'react-native-contacts';
import {FlatList} from 'react-native-gesture-handler';
import {widthPrecent as wp, heightPercent as hp} from '../../utils/responsive';
interface props {
  data: Contact[];
  onPress: (Contact: Contact) => void;
}
const List: React.FC<props> = ({data, onPress}) => {
  return (
    <View style={{paddingBottom: hp(5), marginTop: hp(1)}}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              onPress(item);
            }}
            style={styles.listContainer}>
            <View>
              {item.hasThumbnail ? (
                <View style={{...styles.image, elevation: 5}}>
                  <Image
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                    source={{uri: item.thumbnailPath}}
                  />
                </View>
              ) : (
                <View style={{...styles.image, elevation: 1}}>
                  <Text
                    style={{
                      fontSize: hp(3),
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    {item.displayName.substring(0, 1)}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                width: '50%',
                alignItems: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: wp(4.5),
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {item.displayName}
              </Text>
              <Text style={{fontSize: wp(4), color: 'lightgrey'}}>
                {'Good Morning'}
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                alignItems: 'flex-end',
              }}>
              <Text style={{marginRight: '5%', color: 'grey'}}>
                {'Yesteday'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default List;
const styles = StyleSheet.create({
  listContainer: {
    marginVertical: wp(0.5),
    paddingVertical: wp(2),
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: hp(8),
    width: hp(8),
    borderRadius: hp(4),
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
