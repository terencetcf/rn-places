import React from 'react';
import { StyleSheet, View, Text, ViewProps } from 'react-native';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';

interface IProps extends ViewProps {
  title?: string;
}

const Card: React.FC<IProps> = ({ title, ...props }) => {
  return (
    <View style={{ ...styles.container, ...(props.style as object) }}>
      {title && <Text style={styles.title}>{title}</Text>}
      {props.children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.primary,
  },
});
