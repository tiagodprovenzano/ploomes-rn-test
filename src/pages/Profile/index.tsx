import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Platform,
  View,
  Linking,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ISelf } from "@ploomes/ploomeststypes";

import type { StoreState } from "../../store";

import { signOut } from "../../store/modules/auth/actions";

import Button from "../../components/Button";

import {
  Container,
  Top,
  AvatarArea,
  Avatar,
  Description,
  Name,
  Doc,
  Especialty,
  InfoView,
  FullDescriptionView,
  FullDescription,
  Linkedin,
  GraduationsView,
  GraduationsTitle,
  Graduation,
  GraduationShow,
  GraduationCourse,
  ExperienciesView,
  ExperienciesTitle,
  Experiencies,
  ExperienciesShow,
  ExperienciesCourse,
  ButtonArea,
} from "./styles";

export default function ProfessionalProfile() {
  const dispatch = useDispatch();

  const profile = useSelector(
    (state: StoreState): ISelf => state.auth.profile as ISelf
  );

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Top>
          <AvatarArea>
            {profile?.AvatarUrl !== null ? (
              <Avatar source={{ uri: `${profile.AvatarUrl}` }} />
            ) : (
              <Avatar
                source={{
                  uri: `https://ui-avatars.com/api/?background=786fb0&color=fff&&name=${profile.Name}`,
                }}
              />
            )}
          </AvatarArea>
          <Description>
            <Name
              style={
                Platform.OS === "android" && {
                  width: wp("68%"),
                }
              }
            >
              {profile.Name}
            </Name>
            <Doc>{profile.Email}</Doc>
            <Especialty>{profile.Phone}</Especialty>
            <InfoView>
              <TouchableOpacity
                onPress={() => Linking.openURL(`${profile.Name}`)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Icon name="linkedin" size={32} color="#0e76a8" />
                  <Linkedin style={{ marginLeft: hp(`1`) }}>
                    Perfil LinkedIn
                  </Linkedin>
                </View>
              </TouchableOpacity>
            </InfoView>
          </Description>
        </Top>

        <FullDescriptionView>
          <FullDescription>
            Me chamo {profile.Name} gosto de jogar futebol, assistir filems e
            séries e desenvolver apps.
          </FullDescription>
        </FullDescriptionView>

        <GraduationsView>
          <GraduationsTitle>Formação</GraduationsTitle>
          <Graduation>
            <GraduationShow>
              <GraduationCourse>• Formação 1 - Escola 1</GraduationCourse>
              <GraduationCourse>• Formação 2 - Escola 2</GraduationCourse>
              <GraduationCourse>• Formação 3 - Escola 3</GraduationCourse>
              <GraduationCourse>• Formação 4 - Escola 4</GraduationCourse>
            </GraduationShow>
          </Graduation>
        </GraduationsView>

        <ExperienciesView>
          <ExperienciesTitle>Experiência</ExperienciesTitle>
          <Experiencies>
            <ExperienciesShow>
              <ExperienciesCourse>• Formação 1 - Escola 1</ExperienciesCourse>
              <ExperienciesCourse>• Formação 2 - Escola 2</ExperienciesCourse>
              <ExperienciesCourse>• Formação 3 - Escola 3</ExperienciesCourse>
              <ExperienciesCourse>• Formação 4 - Escola 4</ExperienciesCourse>
            </ExperienciesShow>
          </Experiencies>
        </ExperienciesView>
        <ButtonArea>
          <Button onPress={handleSignOut}>Sair</Button>
        </ButtonArea>
      </Container>
    </SafeAreaView>
  );
}
