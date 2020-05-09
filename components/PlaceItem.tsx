import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import DefaultTouchable from './default/DefaultTouchable';
import { IPlace } from '../models/Place';
import Colors from '../constants/Colors';

type Props = {
  place: IPlace;
  onPress: () => void;
};
const PlaceItem: React.FC<Props> = ({ place, onPress, ...props }) => {
  return (
    <DefaultTouchable onPress={onPress}>
      <View style={styles.container}>
        <Image source={{ uri: place.imageUri }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.address}>{place.address}</Text>
        </View>
      </View>
    </DefaultTouchable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.darkGrey,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  details: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: '#666',
    fontSize: 18,
    marginBottom: 5,
  },
  address: {
    color: '#666',
    fontSize: 16,
  },
});
