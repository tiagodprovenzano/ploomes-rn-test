import styled, { css } from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from '../../styles/themes/theme';

interface ButtonProps {
  disabled: boolean;
}

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background-color: ${theme.primary};
  border-radius: ${theme.secondBorder};
  margin: 20px 0;

  justify-content: center;
  align-items: center;
  flex-direction: row;

  ${(props: ButtonProps) =>
    props.disabled === true &&
    css`
      opacity: 0.4;
    `}
`;

export const ButtonText = styled.Text`
  color: ${theme.white};
  font-size: ${RFValue(16)};
  font-family: ${theme.fontFamilyBold};
`;
