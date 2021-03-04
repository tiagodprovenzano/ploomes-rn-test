import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Text } from "react-native";

import theme from "../../styles/themes/theme";

import logo from "../../assets/logo.png";

import {
  Container,
  Body,
  Title,
  ContactsList,
  Card,
  Avatar,
  InfoContainer,
  InfoName,
  InfoText,
  IconsArea,
} from "./styles";

const data = [
  {
    name: "Vinicius",
    email: "vini@gmail.com",
    avatar_url: "",
    phone: "11 33333-4444",
  },
  {
    name: "Vinicius1",
    email: "vini1@gmail.com",
    avatar_url: "",
    phone: "11 33333-4444",
  },
  {
    name: "Vinicius2",
    email: "vini2@gmail.com",
    avatar_url: "",
    phone: "11 33333-4444",
  },
  {
    name: "Vinicius3",
    email: "vini3@gmail.com",
    avatar_url: "",
    phone: "11 33333-4444",
  },
];

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Body>
        <Title>Contatos</Title>
        <ContactsList
          data={data}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <Card>
              {/* <ContainerAvatar> */}
              <Avatar source={logo} />
              {/* </ContainerAvatar> */}
              <InfoContainer>
                <InfoName>{item.name}</InfoName>
                <InfoText>{item.email}</InfoText>
                <InfoText>{item.phone}</InfoText>
              </InfoContainer>
              <IconsArea>
                <Icon
                  name="pencil"
                  size={20}
                  color={theme.primary}
                  style={{ paddingVertical: 10 }}
                />
                <Icon
                  name="delete"
                  size={20}
                  color={theme.alert}
                  style={{ paddingVertical: 10 }}
                />
              </IconsArea>
            </Card>
          )}
        />
      </Body>
    </Container>
  );
};

export default Dashboard;
