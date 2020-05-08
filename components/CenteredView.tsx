import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IProps {
  message?: string;
}

const CenteredView: React.FC<IProps> = (props) => {
  return (
    <View style={styles.centered}>
      {props.message && <Text>{props.message}</Text>}
      {props.children}
    </View>
  );
};

export default CenteredView;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
