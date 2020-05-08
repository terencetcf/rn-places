import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import DefaultTouchable from './default/DefaultTouchable';
import { IPlace } from '../models/Place';

type Props = {
  place: IPlace;
  onPress: () => void;
};
const PlaceItem: React.FC<Props> = ({ place, onPress, ...props }) => {
  return (
    <DefaultTouchable onPress={() => onPress()} useForeground>
      <Image source={{ uri: place.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </DefaultTouchable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
  },
  address: {},
});
