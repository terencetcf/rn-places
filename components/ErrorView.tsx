import React from 'react';
import { Button } from 'react-native';

import CenteredView from './CenteredView';
import Colors from '../constants/Colors';

interface IProps {
  retry: () => void;
}

const ErrorView: React.FC<IProps> = (props) => {
  return (
    <CenteredView message="An error occurred!">
      <Button title="Try again" onPress={props.retry} color={Colors.primary} />
    </CenteredView>
  );
};

export default ErrorView;
