import styled, {css} from 'styled-components/native';
import { Platform } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import theme from '../../styles/themes/theme';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.white};
`;

export const Body = styled.ScrollView.attrs({
  contentContainerStyle: {
    backgroundColor: theme.background,
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
  margin-top: ${Platform.OS === 'ios' ? 0 : 15};
  margin-bottom: ${Platform.OS === 'ios' ? 15 : 10};
`;

export const Card = styled.View`
  align-items: center;
  padding: 15px;
  border-radius: ${theme.secondBorder};
  flex-direction: row;
  background-color: ${theme.lighter};
  margin: 10px 15px;
`;

export const ContainerAvatar = styled.View`
  justify-content: center;
  align-self: center;
  width: 70%;
  height: 100px;
`;

export const Avatar = styled.Image.attrs({
  // resizeMode: 'contain'
})`
  width: ${hp('10%')};
  height: ${hp('10%')};
  border-radius: ${hp('5%')};
  align-self: center;
  background-color: ${theme.white};
`;

export const InfoContainer = styled.View`
  border-radius: ${theme.primaryBorder};
  flex-direction: column;
  margin-left: 20px;
  flex: 1;
  justify-content: flex-start;
`;

export const InfoArea = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const InfoName = styled.Text`
  color: ${theme.dark};
  font-size: ${RFValue(18)};
  font-family: ${theme.fontFamilyBold};
`;

export const InfoText = styled.Text`
  color: ${theme.dark};
  font-size: ${RFValue(14)};
  font-family: ${theme.fontFamilyNormal};
`

export const IconsArea = styled.View`
  justify-content: space-around;
  align-self: center;
  flex-direction: column;
`;

export const AddButton = styled.TouchableOpacity`
  background-color: ${theme.primary};
  position: absolute;
  height: ${wp('17%')};
  width: ${wp('17%')};
  border-radius: 50;
  bottom: ${Platform.OS === 'ios' ? hp('2%') : hp('1%')};
  right: ${wp('3.8%')};
  justify-content: center;
  align-items: center;
`;
