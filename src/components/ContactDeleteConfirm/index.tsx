import React from "react";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";

import { deleteContactRequest } from "../../store/modules/contacts/actions";

import theme from "../../styles/themes/theme";

import {
  Modal,
  ModalArea,
  ModalBody,
  TitleArea,
  Title,
  Description,
  ButtonsArea,
  BackButton,
  BackButtonText,
  ConfirmButton,
  ConfirmButtonText,
} from "./styles";

interface Props {
  openDeleteModal: boolean;
  setOpenDeleteModal: (boolean) => void;
  contactId: number;
}

const ContactDeleteConfirm = ({
  openDeleteModal,
  setOpenDeleteModal,
  contactId,
}: Props) => {
  const dispatch = useDispatch();

  async function handleDelete() {
    dispatch(deleteContactRequest(contactId));

    setOpenDeleteModal(false);
  }

  return (
    <Modal
      visible={openDeleteModal}
      onRequestClose={() => setOpenDeleteModal(false)}
      transparent
      animationType="fade"
    >
      <ModalArea>
        <ModalBody>
          <TitleArea>
            <Icon
              style={{
                alignSelf: "flex-end",
                right: 5,
              }}
              onPress={() => setOpenDeleteModal(false)}
              name="account-off"
              size={Platform.OS === "ios" ? 28 : 25}
              color={theme.primary}
              hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
            />
            <Title>Remover Contato</Title>
          </TitleArea>

          <Description>
            Você tem certeza que deseja remover esse contato?
          </Description>

          <ButtonsArea>
            <BackButton onPress={() => setOpenDeleteModal(false)}>
              <BackButtonText>Voltar</BackButtonText>
            </BackButton>

            <ConfirmButton onPress={() => handleDelete()}>
              <ConfirmButtonText>Tenho certeza</ConfirmButtonText>
            </ConfirmButton>
          </ButtonsArea>
        </ModalBody>
      </ModalArea>
    </Modal>
  );
};

export default ContactDeleteConfirm;
