import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IContacts } from "@ploomes/ploomeststypes";
import { useNavigation } from "@react-navigation/native";

import theme from "../../styles/themes/theme";

import type { StoreState } from "../../store";

import DateHelper from "../../helpers/dateValidate";

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
  InfoArea,
  InfoName,
  InfoText,
  IconsArea,
} from "./styles";

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const contactsReducer = useSelector(
    (state: StoreState): IContacts[] => state.contacts.contacts
  );
  const [contacts, setContacts] = useState<IContacts[]>([] as IContacts[]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [contactId, setContactId] = useState<string>("");

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

  const handleEditContact = useCallback((contatc) => {
    navigation.navigate("Contato", { contatc });
  }, []);

  const formattedDate = useCallback((date) => {
    console.log(typeof date);

    const newDate = DateHelper.formatedDate(date);

    return newDate;
  }, []);

  return (
    <Container>
      <Body>
        <Title>Contatos</Title>
        <ContactsList
          data={contacts as IContacts[]}
          keyExtractor={(item) => String(item.Id)}
          renderItem={({ item }) => (
            <Card>
              {item?.AvatarUrl !== null ? (
                <Avatar source={{ uri: `${item.AvatarUrl}` }} />
              ) : (
                <Avatar
                  source={{
                    uri: `https://ui-avatars.com/api/?background=786fb0&color=fff&&name=${item.Name}`,
                  }}
                />
              )}
              <InfoContainer>
                {item?.Name !== null && (
                  <InfoArea>
                    <Icon
                      name="account"
                      size={20}
                      color={theme.primary}
                      style={{ marginRight: 10 }}
                    />
                    <InfoName>{item.Name}</InfoName>
                  </InfoArea>
                )}
                {item?.Email !== null && (
                  <InfoArea>
                    <Icon
                      name="mail"
                      size={20}
                      color={theme.primary}
                      style={{ marginRight: 10 }}
                    />
                    <InfoText>{item.Email}</InfoText>
                  </InfoArea>
                )}
                {item?.Skype !== null && (
                  <InfoArea>
                    <Icon
                      name="skype"
                      size={20}
                      color={theme.primary}
                      style={{ marginRight: 10 }}
                    />
                    <InfoText>{item.Skype}</InfoText>
                  </InfoArea>
                )}
                {item?.Birthday !== null && (
                  <InfoArea>
                    <Icon
                      name="cake"
                      size={20}
                      color={theme.primary}
                      style={{ marginRight: 10 }}
                    />
                    <InfoText>{formattedDate(item?.Birthday)}</InfoText>
                  </InfoArea>
                )}
              </InfoContainer>
              <IconsArea>
                <Icon
                  name="pencil"
                  size={20}
                  color={theme.primary}
                  style={{ paddingVertical: 10 }}
                  onPress={() => handleEditContact(item)}
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

export default Home;
