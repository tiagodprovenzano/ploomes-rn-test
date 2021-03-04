import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

import theme from '../../styles/themes/theme';

export const Modal = styled.Modal`
  flex: 1;
`;

export const ModalArea = styled.View`
  flex: 1;
  height: ${hp('100%')};
  width: ${wp('100%')};
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
`;

export const ModalBody = styled.View`
  background-color: ${theme.white};
  width: ${Platform.OS === 'android' ? wp('70%') : wp('80%')};
  padding-left: ${wp('7.5%')};
  padding-right: ${wp('7.5%')};
  border-radius: ${theme.secondBorder};
`;

export const TitleArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin-top: ${hp('2.82%')};
  font-family: ${theme.fontFamilyBold};
  font-size: ${RFValue(16)};
  text-align: center;
  color: ${theme.primary};
  padding-bottom: ${Platform.OS === 'android' ? hp('0.5%') : hp('0%')};
`;

export const Description = styled.Text`
  margin-top: ${hp('2.82%')};
  font-family: ${theme.fontFamilyNormal};
  font-size: ${RFValue(14)};
  text-align: center;
  width: ${Platform.OS === 'android' ? wp('60%') : wp('60%')};
  align-self: center;
  justify-content: center;
`;

export const ButtonsArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: ${hp('2.82%')};
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: ${hp('2.82%')};
  align-items: center;
  justify-content: center;
  background: transparent;
`;

export const BackButtonText = styled.Text`
  color: ${theme.primary};
  font-family: ${theme.fontFamilyBold};
  font-size: ${RFValue(14)};
  margin-right: ${wp('5.63%')};
`;

export const ConfirmButton = styled.TouchableOpacity`
  margin-top: ${hp('2.82%')};
  align-items: center;
  justify-content: center;
  background: ${theme.primary};
  height: ${hp('6.34%')};
  width: ${wp('38.13%')};
  border-radius: ${theme.primaryBorder};
`;

export const ConfirmButtonText = styled.Text`
  color: ${theme.white};
  font-family: ${theme.fontFamilyBold};
  font-size: ${RFValue(14)};
`;
