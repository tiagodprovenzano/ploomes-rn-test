import styled from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Transitioning } from "react-native-reanimated";

import theme from '../../styles/themes/theme';

export const Container = styled.TouchableWithoutFeedback`
`;

export const Content = styled(Transitioning.View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: auto;
  border-radius: 90px;
  margin: 8px;
`;

export const Label = styled.Text`
  color: ${theme.white};
  font-size: ${RFValue(14)};
  font-family: ${theme.fontFamilyBold};
  align-items: center;
  justify-content: center;
`;


export const Icon = styled(MaterialIcon)`
  margin-right: 16px;
`;
