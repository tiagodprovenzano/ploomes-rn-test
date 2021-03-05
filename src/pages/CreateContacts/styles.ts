import styled, {css} from 'styled-components/native';
import { Platform } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import theme from '../../styles/themes/theme';

interface SelectProps {
  error?: boolean;
  isFocused?: boolean;
}

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  enabled: true,
})`
  flex: 1;
  background-color: ${theme.white};
`;

export const Body = styled.ScrollView.attrs({
  contentContainerStyle: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  showsVerticalScrollIndicator: false,
})``;

export const ContainerLogo = styled.View`
  justify-content: center;
  align-self: center;
  width: 70%;
  height: 100px;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: 100%;
  height: 100%;
`;

export const Title = styled.Text`
  color: ${theme.primary};
  font-size: ${RFValue(20)};
  font-family: ${theme.fontFamilyBold};
  align-self: center;
  margin-bottom: 15px;
`;

export const Avatar = styled.Image`
  width: ${hp('18%')};
  height: ${hp('18%')};
  border-radius: ${hp('9%')};
  align-self: center;
`;

export const SelectArea = styled.TouchableOpacity`
`;

export const SelectLabelArea = styled.View`
  align-self: flex-start;
`;

export const SelectLabel = styled.Text`
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  color: ${theme.dark};
  font-size: ${RFValue(theme.fontSize)};
  font-family: ${theme.fontFamilyBold};
  margin: 15px 0 10px;
`;

export const SelectContainer = styled.View<SelectProps>`
  align-self: stretch;
  height: 60px;
  padding: 0 16px;
  background-color: ${theme.light};
  border-radius: ${theme.secondBorder};
  margin-bottom: 8px;
  border-width: 1px;
  border-color: ${theme.transparent};
  border-style: solid;
  flex-direction: row;
  align-items: center;
  z-index: 1;


  ${(props) => props.error &&
    css`
      border-color: ${theme.alert};
      border-width: 2px;
    `}

  ${(props) => props.isFocused &&
    css`
      border-color: ${theme.primary};
      border-width: 2px;
    `}
`;

export const SelectInputAndroid = styled(Picker)`
  color: ${theme.dark};
  font-size: ${RFValue(theme.fontSize)};
  font-family: ${theme.fontFamilyNormal};
  flex: 1;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const SelectInputIOS = styled.Text`
  color: ${theme.dark};
  font-size: ${RFValue(theme.fontSize)};
  font-family: ${theme.fontFamilyNormal};
  flex: 1;
  align-items: center;
  /* justify-content: center; */
  z-index: 999;
`;

export const SelectIcon = styled(MaterialIcon)`
  margin-right: 16px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  color: theme.primary,
  size: 'large',
})``;

export const BackButton = styled.TouchableOpacity`
  background-color: ${theme.primary};
  position: absolute;
  height: ${wp('17%')};
  width: ${wp('17%')};
  border-radius: 50;
  top: ${Platform.OS === 'ios' ? hp('2%') : hp('1%')};
  left: ${wp('3.8%')};
  justify-content: center;
  align-items: center;
`;
