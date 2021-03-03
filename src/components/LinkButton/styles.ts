import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from '../../styles/themes/theme';

export const Container = styled.TouchableOpacity`
  align-self: flex-start;
  align-items: center;
  margin: 5px 0 15px;
  flex-direction: row;
`;

export const LinkButtonText = styled.Text`
  color: ${theme.primary};
  font-size: ${RFValue(theme.fontSize)};
  font-family: ${theme.fontFamilyBold};
`;

