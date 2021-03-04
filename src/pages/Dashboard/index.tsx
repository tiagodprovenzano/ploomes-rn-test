import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IContacts } from "@ploomes/ploomeststypes";

import theme from "../../styles/themes/theme";

import type { StoreState } from "../../store";

// import logo from "../../assets/logo.png";

import { getContactsRequest } from "../../store/modules/contacts/actions";

import ContactDeleteConfirm from "../../components/ContactDeleteConfirm";

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

const Dashboard = () => {
  const dispatch = useDispatch();

  const contactsReducer = useSelector(
    (state: StoreState): IContacts[] => state.contacts.contacts
  );
  const [contacts, setContacts] = useState<IContacts[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [contactId, setContactId] = useState<number>();

  useEffect(() => {
    dispatch(getContactsRequest());
  }, []);

  useEffect(() => {
    if (contactsReducer) {
      setContacts(contactsReducer);
    }
  }, [contactsReducer]);

  const handleDelete = useCallback((id) => {
    setOpenDeleteModal(true);
    setContactId(id);
  }, []);

  const handleEditContact = useCallback((id) => {
    setOpenDeleteModal(true);
    setContactId(id);
  }, []);

  return (
    <Container>
      <Body>
        <Title>Contatos</Title>
        <ContactsList
          data={contacts}
          keyExtractor={(item) => String(item.Id)}
          renderItem={({ item }) => (
            <Card>
              {/* <ContainerAvatar> */}
              <Avatar source={{ uri: `${item.AvatarUrl}` }} />
              {/* </ContainerAvatar> */}
              <InfoContainer>
                <InfoName>{item.Name}</InfoName>
                <InfoText>{item.Email}</InfoText>
                <InfoText>{item.StatusId}</InfoText>
              </InfoContainer>
              <IconsArea>
                <Icon
                  name="pencil"
                  size={20}
                  color={theme.primary}
                  style={{ paddingVertical: 10 }}
                  onPress={() => handleEditContact(item.Id)}
                />
                <Icon
                  name="delete"
                  size={20}
                  color={theme.alert}
                  style={{ paddingVertical: 10 }}
                  onPress={() => handleDelete(item.Id)}
                />
              </IconsArea>
            </Card>
          )}
        />
        <ContactDeleteConfirm
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          contactId={contactId}
        />
      </Body>
    </Container>
  );
};

export default Dashboard;
