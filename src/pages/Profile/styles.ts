import styled, {css} from 'styled-components/native';
import {Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

import theme from '../../styles/themes/theme';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  margin-left: ${wp('5%')};
  padding-right: ${Platform.OS === 'ios' ? wp('1%') : wp('5%')};
  width: 370;
  margin-bottom: ${hp('3%')};
`;

export const Top = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: ${hp('2%')};
  align-items: center;
`;

export const AvatarArea = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  width: ${hp('12,68%')};
  height: ${hp('12,68%')};
  border-radius: ${hp('7.5%')};
  z-index: 999;
`;

export const Avatar = styled.Image`
  width: ${hp('12,68%')};
  height: ${hp('12,68%')};
  border-radius: ${hp('7.5%')};
`;

export const Description = styled.View`
  flex: 1;
  margin-left: ${wp('5%')};
`;

export const Name = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: ${theme.gray};
  font-size: ${RFValue(16)};
  font-weight: bold;
  font-family: ${theme.fontFamilyBold};
`;

export const Especialty = styled.Text.attrs({
  // numberOfLines: 2,
})`
  color: ${theme.gray};
  font-size: ${RFValue(12)};
  font-family: ${theme.fontFamilyBold};
`;

export const Doc = styled.Text`
  color: ${theme.gray};
  font-size: ${RFValue(12)};
  font-family: ${theme.fontFamilyNormal};
  font-weight: bold;
`;

export const InfoView = styled.View`
  flex-direction: row;
  align-items: center;
`;


export const Linkedin = styled.Text`
  color: ${theme.gray};
  font-size: ${hp('2%')};
  font-family: ${theme.fontFamilyBold};
  font-weight: bold;
`;

export const FullDescriptionView = styled.View`
  margin-top: ${wp('5%')};
  flex-direction: column;
`;

export const FullDescription = styled.Text`
  color: ${theme.dark};
  font-size: ${RFValue(12)};
  font-family: ${theme.fontFamilyNormal};
  line-height: ${RFValue(16)};
`;

export const GraduationsView = styled.View`
  margin-top: ${hp('2%')};
`;

export const GraduationsTitle = styled.Text`
  color: ${theme.dark};
  font-size: ${hp('2%')};
  font-family: ${theme.fontFamilyBold};
`;

export const Graduation = styled.View`
  margin-top: ${hp('2%')};
  flex-direction: row;
  align-items: center;
  border-top-color: ${theme.lighter};
  border-top-width: 1;
`;

export const GraduationShow = styled.View`
  margin-left: ${wp('5%')};
  margin-top: ${hp('2%')};
`;

export const GraduationCourse = styled.Text`
  color: ${theme.dark};
  font-size: ${hp('1.7%')};
  font-family: ${theme.fontFamilyNormal};
  width: ${wp('75%')};
  font-weight: 500;
`;

export const ExperienciesView = styled.View`
  margin-top: ${hp('4%')};
`;

export const ExperienciesTitle = styled.Text`
  color: ${theme.dark};
  font-weight: bold;
  font-size: ${hp('2%')};
  font-family: ${theme.fontFamilyBold};
`;

export const Experiencies = styled.View`
  margin-top: ${hp('2%')};
  flex-direction: row;
  align-items: center;
  border-top-color: ${theme.lighter};
  border-top-width: 1;
`;

export const ExperienciesShow = styled.View`
  margin-left: ${wp('5%')};
  margin-top: ${hp('1%')};
`;

export const ExperienciesCourse = styled.Text`
  color: ${theme.dark};
  font-size: ${hp('1.7%')};
  font-family: ${theme.fontFamilyNormal};
  width: ${wp('75%')};
  font-weight: 500;
`;
