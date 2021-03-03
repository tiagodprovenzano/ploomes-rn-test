import styled, {css} from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
// import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';

import theme from '../../styles/themes/theme';

interface InputProps {
  error?: boolean;
  isFocused?: boolean;
}

export const Label = styled.Text`
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  color: ${theme.dark};
  font-size: ${RFValue(theme.fontSize)};
  font-family: ${theme.fontFamilyBold};
  margin: 15px 0 10px;
`;

export const Container = styled.View<InputProps>`
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

export const SelectInput = styled(Picker)`
  color: ${theme.dark};
  font-size: ${RFValue(theme.fontSize)};
  font-family: ${theme.fontFamilyNormal};
  flex: 1;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const Icon = styled(MaterialIcon)`
  margin-right: 16px;
`;
