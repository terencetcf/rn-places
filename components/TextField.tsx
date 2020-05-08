import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';

interface IProps extends TextInputProps {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  required?: boolean;
  validateErrorMessage?: string;
  validate?: () => boolean;
}

const TextField: React.FC<IProps> = ({
  label,
  labelStyle,
  required = false,
  validateErrorMessage,
  validate,
  ...props
}) => {
  const [showValidation, setShowValidation] = useState(false);

  const onBlur = () => {
    if (!required) {
      return;
    }

    if (!validate) {
      setShowValidation(!props.value || props.value.length < 1);
      return;
    }

    setShowValidation(!validate());
  };

  return (
    <View style={styles.formControl}>
      <Text style={{ ...styles.label, ...(labelStyle as object) }}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        {...props}
        style={{ ...styles.input, ...(props.style as object) }}
        onBlur={onBlur}
      />
      {showValidation && (
        <Text style={styles.errorMessage}>{`${
          validateErrorMessage ? validateErrorMessage : 'Please enter'
        } ${label.toLocaleLowerCase()}`}</Text>
      )}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
    marginBottom: 25,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 1,
  },
  required: {
    color: 'red',
    fontSize: 12,
    textAlignVertical: 'top',
  },
  errorMessage: {
    color: 'red',
  },
});
