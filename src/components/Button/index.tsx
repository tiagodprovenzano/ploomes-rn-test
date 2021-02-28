import React from 'react';
import {ActivityIndicator, TouchableOpacityProps} from 'react-native';
import {RectButtonProperties} from 'react-native-gesture-handler';

import theme from '../../styles/themes/theme';

import {Container, ButtonText} from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  disabled?: boolean;
  loading?: boolean;
  loadingColor?: string;
  onPress(): void;
}

const Button = ({
  children,
  loading,
  loadingColor,
  disabled,
  onPress,
  ...rest
}: ButtonProps) => {
  return (
    <Container
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled as boolean}
      {...rest}>
      {loading ? (
        <ActivityIndicator size="large" color={loadingColor || theme.white} />
      ) : (
        <ButtonText>{children}</ButtonText>
      )}
    </Container>
  );
};

export default Button;
