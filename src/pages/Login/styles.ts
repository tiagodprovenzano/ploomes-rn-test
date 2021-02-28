import styled from 'styled-components/native';
import { Platform } from 'react-native';

import theme from '../../styles/themes/theme';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  enabled: true,
})`
  background-color: ${theme.background};
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const ContainerLogo = styled.View`
  justify-content: center;
  align-self: center;
  width: 90%;
  height: 100px;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: 100%;
  height: 100%;
`;
