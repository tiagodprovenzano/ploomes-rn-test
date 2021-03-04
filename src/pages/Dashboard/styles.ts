import styled, {css} from 'styled-components/native';
import { Platform } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
// import RNPickerSelect from "react-native-picker-select";
import {Picker, PickerIOS} from '@react-native-picker/picker';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';


import theme from '../../styles/themes/theme';

interface SelectProps {
  error?: boolean;
  isFocused?: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.white};

`;

export const Body = styled.ScrollView.attrs({
  contentContainerStyle: {
    backgroundColor: theme.background,
    // paddingTop: Platform.OS === 'ios' ? 40 : 0,
    // paddingBottom: 20,
    flex: 1,
    zIndex: 999,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const ContactsList = styled.FlatList.attrs({
  contentContainerStyle: {
    backgroundColor: theme.white,
    // paddingTop: Platform.OS === 'ios' ? 40 : 0,
    paddingBottom: 20,
    marginBottom: 20,
  },
  showsVerticalScrollIndicator: false,
})``;

export const Title = styled.Text`
  color: ${theme.primary};
  font-size: ${RFValue(20)};
  font-family: ${theme.fontFamilyBold};
  align-self: center;
  margin-bottom: 15px;
`;

export const Card = styled.View`
  align-items: center;
  padding: 15px;
  border-radius: ${theme.secondBorder};
  flex-direction: row;
  background-color: ${theme.lighter};
  margin: 10px;
`;

export const ContainerAvatar = styled.View`
  justify-content: center;
  align-self: center;
  width: 70%;
  height: 100px;
`;

export const Avatar = styled.View.attrs({
  // resizeMode: 'contain'
})`
  width: ${hp('10%')};
  height: ${hp('10%')};
  border-radius: ${hp('5%')};
  align-self: center;
  background-color: green;

`;

export const InfoContainer = styled.View`
  border-radius: ${theme.primaryBorder};
  flex-direction: column;
  /* background-color: yellow; */
  margin-left: 20px;
  padding: 10px;
  flex: 1;
  justify-content: flex-start;
`;


export const InfoName = styled.Text`
  color: ${theme.dark};
  font-size: ${RFValue(18)};
  font-family: ${theme.fontFamilyBold};
  margin-bottom: 15px;
`;

export const InfoText = styled.Text`
  color: ${theme.dark};
  font-size: ${RFValue(14)};
  font-family: ${theme.fontFamilyNormal};
  margin-bottom: 15px;
`

export const IconsArea = styled.View`
  justify-content: space-around;
  align-self: center;
  flex-direction: column;
`;
