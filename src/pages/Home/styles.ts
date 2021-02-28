import styled from 'styled-components/native';
import { Platform } from 'react-native';

import theme from '../../styles/themes/theme';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  enabled: true,
})`
  flex: 1;
  background-color: ${theme.background};
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
