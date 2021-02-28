import React from 'react';
import type {ViewProps} from 'react-native';

import {Container, AlertText} from './styles';

interface TextAlertProps extends ViewProps {
  children: React.ReactNode;
}

const TextAlert = ({children, ...rest}: TextAlertProps) => {
  return (
    <Container {...rest}>
      <AlertText>{children}</AlertText>
    </Container>
  );
};

export default TextAlert;
