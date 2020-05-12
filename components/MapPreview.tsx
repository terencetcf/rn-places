import React from 'react';
import { StyleSheet, Image, StyleProp, ViewStyle, View } from 'react-native';

import ENV from '../env';
import DefaultTouchable from './default/DefaultTouchable';
import { ILocation } from '../models/Location';

interface IProps {
  location?: ILocation;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const MapPreview: React.FC<IProps> = ({ location, ...props }) => {
  let imagePreviewUrl;
  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${ENV.googleApiKey}`;
  }

  return (
    <DefaultTouchable
      onPress={props.onPress}
      style={{ flex: 1, width: '100%' }}
    >
      <View style={{ ...styles.container, ...(props.style as object) }}>
        {imagePreviewUrl ? (
          <Image style={styles.image} source={{ uri: imagePreviewUrl }} />
        ) : (
          props.children
        )}
      </View>
    </DefaultTouchable>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
