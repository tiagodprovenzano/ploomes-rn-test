import React, { useContext, useEffect, useState } from "react";
import { Button, Text, FlatList, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";

import {
  IContactsOrigins,
  IFields,
  IFieldsEntities,
} from "@ploomes/ploomeststypes";
import Icon from "react-native-vector-icons/FontAwesome";

import { userKey } from "../../config";

import api from "../../services/api";

import type { StoreState } from "../../store";

import { signOutRequest } from "../../store/modules/auth/actions";

import { Container } from "./styles";

interface SelectOriginsContacts {
  label: string | undefined;
  value: string | undefined;
}

const Home = () => {
  const dispatch = useDispatch();

  const [fields, setFields] = useState<IFields[]>([]);
  const [contactsOrigins, setContactsOrigins] = useState<IContactsOrigins[]>(
    []
  );
  const [fieldsEntities, setFieldsEntities] = useState<IFieldsEntities[]>([]);
  const [newOriginsContacts, setNewOriginsContacts] = useState<
    SelectOriginsContacts[]
  >([]);
  // const [fieldsEntities, setFieldsEntities] = useState<IFieldsEntities[]>([]);

  useEffect(() => {
    (async () => {
      const response = await api.get("Fields@Types", {
        headers: {
          "User-Key": userKey,
        },
      });

      setFields(response.data.value);
      console.tron.log("Fields@Types", response.data.value);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await api.get("Contacts@Origins", {
        headers: {
          "User-Key": userKey,
        },
      });

      setContactsOrigins(response.data.value);
      console.tron.log("Contacts@Origins", response.data.value);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await api.get(`Fields@Entities?$top=10`, {
        headers: {
          "User-Key": userKey,
        },
      });

      setFieldsEntities(response.data.value);
      console.tron.log("Fields@Entities", response.data.value);
    })();
  }, []);

  function handleSignOut() {
    dispatch(signOutRequest());
  }

  useEffect(() => {
    if (contactsOrigins) {
      let origins: SelectOriginsContacts[] = [];

      contactsOrigins?.map((item) =>
        origins.push({
          label: item?.Name,
          value: item?.Name,
        })
      );

      // console.tron.log({ origins });

      setNewOriginsContacts(origins);
    }
  }, [contactsOrigins]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={newOriginsContacts}
        />

        <FlatList
          data={fields}
          style={{ backgroundColor: "red" }}
          keyExtractor={(item) => String(item.Id)}
          renderItem={({ item }) => (
            <>
              <Text style={{ color: "black" }}>{item.Name}</Text>
              {/* <Text style={{ color: "black" }}>{item.Icon}</Text> */}
              {/* <Icon name={item.Icon} /> */}
            </>
          )}
        />

        {/* <RNPickerSelect
          pickerProps={{
            accessibilityLabel: "Escolha um tipo",
          }}
        >
          <>
            {contactsOrigins.map((item) => (
              <Text>{item.Name}</Text>
            ))}
          </> */}
        {/* </RNPickerSelect> */}
        <Button onPress={handleSignOut} title="Sair" />
      </Container>
    </SafeAreaView>
  );
};

export default Home;
