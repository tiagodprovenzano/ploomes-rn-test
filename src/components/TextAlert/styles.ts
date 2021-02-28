import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import theme from '../../styles/themes/theme';

export const Container = styled.View`
  width: 100%;
  margin-top: 8px;

  margin-top: ${hp('-.5%')};
  margin-bottom: ${hp('1.5%')};
  margin-left: 5px;
  width: ${wp('80%')};

  align-self: flex-start;
  flex-direction: row;
`;

export const AlertText = styled.Text`
  color: ${theme.alert};
  font-size: ${RFValue(theme.fontSize)};
  font-family: ${theme.fontFamilyBold};
`;

