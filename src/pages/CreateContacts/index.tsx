import React, { useEffect, useState, useRef, useCallback } from "react";
import { SafeAreaView, Alert, View, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { mask } from "remask";
import RNFetchBlob from "rn-fetch-blob";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import { useRoute, useNavigation } from "@react-navigation/native";
import { PickerIOS } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  IContactsOrigins,
  IContactsTypes,
  IContacts,
  IContactsPhones,
  ICities,
} from "@ploomes/ploomeststypes";

import logo from "../../assets/logo.png";

import AuthContacts from "../../validations/authContacts";

import DateHelper from "../../helpers/dateValidate";
import DocHelper from "../../helpers/docValidate";

import type { StoreState } from "../../store";

import { sendImageAvatar } from "../../utils/sendImageAvatar";

import {
  createContactRequest,
  getEditingContactRequest,
  getOriginsContactsRequest,
  getTypesContactsRequest,
  getOriginContactRequest,
  getTypeContactRequest,
  getCitiesRequest,
  updateContactRequest,
  getEditingContactSuccess,
} from "../../store/modules/contacts/actions";

import theme from "../../styles/themes/theme";

import Button from "../../components/Button";
import LinkButton from "../../components/LinkButton";
import Input from "../../components/Input";
import InputMask from "../../components/InputMask";
import TextAlert from "../../components/TextAlert";

import {
  Container,
  Body,
  ContainerLogo,
  Logo,
  Title,
  Avatar,
  SelectArea,
  SelectLabelArea,
  SelectLabel,
  SelectContainer,
  SelectInputAndroid,
  SelectInputIOS,
  SelectIcon,
  Loading,
  BackButton,
} from "./styles";

interface TypeSelectOriginsContacts extends IContactsOrigins {
  label: string | undefined;
  value: object | undefined;
}

interface TypeSelectTypesContacts {
  label: string;
  value: object;
}

interface RouteParams {
  contatcId: string;
}

const CreateContacts = () => {
  const dispatch = useDispatch();

  const route = useRoute();
  const navigation = useNavigation();

  const routeParams = route.params as RouteParams;

  useEffect(() => {
    if (routeParams) {
      dispatch(getEditingContactRequest(routeParams?.contatcId));
    }
  }, [routeParams]);

  const nameRef = useRef<any>(null);
  const docRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const skypeRef = useRef<any>(null);
  const birthDateRef = useRef<any>(null);
  const phoneRef = useRef<any>(null);
  const cepRef = useRef<any>(null);
  const addressRef = useRef<any>(null);
  const numberRef = useRef<any>(null);
  const complementRef = useRef<any>(null);
  const neighborhoodRef = useRef<any>(null);
  const stateRef = useRef<any>(null);
  const cityRef = useRef<any>(null);

  const formattedDate = useCallback((birth: string) => {
    const newDate = DateHelper.formatedDate(birth);

    return newDate;
  }, []);

  const loading = useSelector((state: StoreState) => state.contacts.loading);
  const editingContact = useSelector(
    (state: StoreState): IContacts[] => state.contacts.editingContact
  );
  const contactsOriginsReducer = useSelector(
    (state: StoreState): IContactsOrigins[] => state.contacts.contactsOrigins
  );
  const contactsTypesReducer = useSelector(
    (state: StoreState): IContactsTypes[] => state.contacts.contactsTypes
  );
  const contactOriginReducer = useSelector(
    (state: StoreState): IContactsOrigins[] => state.contacts.contactOrigin
  );
  const contactTypeReducer = useSelector(
    (state: StoreState): IContactsTypes[] => state.contacts.contactType
  );
  const locale = useSelector(
    (state: StoreState): ICities => state.contacts.locale
  );

  const phoneParams: IContactsPhones[] | undefined = editingContact[0]?.Phones;

  const avatarDefault =
    "https://s3-sa-east-1.amazonaws.com/ploomescrm/avatar_default.jpg";

  const [originVisible, setOriginVisible] = useState(true);
  const [typeVisible, setTypeVisible] = useState(true);
  const [avatar, setAvatar] = useState(
    editingContact[0]?.AvatarUrl ? editingContact[0]?.AvatarUrl : avatarDefault
  );
  const [birthDate, setBirthDate] = useState(
    editingContact[0]?.Birthday
      ? formattedDate(editingContact[0]?.Birthday)
      : ""
  );
  const [cpf, setCpf] = useState(
    editingContact[0]?.CPF ? formattedDate(editingContact[0]?.CPF) : ""
  );
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [originId, setOriginId] = useState(
    editingContact[0]?.OriginId ? editingContact[0]?.OriginId : ""
  );
  const [contactTypeId, setContactTypeId] = useState(
    editingContact[0]?.TypeId ? editingContact[0]?.TypeId : ""
  );

  const [originName, setOriginName] = useState(
    contactOriginReducer[0]?.Name
      ? contactOriginReducer[0]?.Name
      : "Escolha a origem"
  );
  const [contactTypeName, setContactTypeName] = useState(
    contactTypeReducer[0]?.Name ? contactTypeReducer[0]?.Name : "Escolha o tipo"
  );
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cep, setCep] = useState(
    editingContact[0]?.ZipCode ? editingContact[0]?.ZipCode.toString() : ""
  );
  const [phone, setPhone] = useState(phoneParams ? phoneParams : "");
  const [isDate, setIsDate] = useState(true);
  const [isDoc, setIsDoc] = useState(true);
  const [cepError, setCepError] = useState(false);

  useEffect(() => {
    if (editingContact) {
      // setAvatar(editingContact[0]?.AvatarUrl as string);
      // setBirthDate(formattedDate(editingContact[0]?.Birthday));
      // setOriginId(editingContact[0]?.OriginId as number);
      // setContactTypeId(editingContact[0]?.TypeId as number);
    }
  }, [editingContact]);

  useEffect(() => {
    if (phoneParams && phoneParams?.length > 0) {
      setPhone(mask(phoneParams[0].PhoneNumber, ["(99) 99999-9999"]));
    }
  }, [phoneParams]);

  useEffect(() => {
    if (originId) {
      dispatch(getOriginContactRequest(originId as string));
    }
  }, [originId]);

  useEffect(() => {
    if (contactTypeId) {
      dispatch(getTypeContactRequest(contactTypeId as string));
    }
  }, [contactTypeId]);

  const options = {
    title: "Selecione uma imagem",
    takePhotoButtonTitle: "Tirar uma Foto",
    chooseFromLibraryButtonTitle: "Escolher da Galeria",
    quality: 1,

    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  };

  async function chooseAvatar() {
    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        return;
      }

      if (response.error) {
        Alert.alert("Erro ao carregar avatar!", "Tente novamente.");
        return;
      }

      const { error } = response;

      let rotation = 0;

      if (response.uri && !error) {
        rotation = 0;
      }

      ImageResizer.createResizedImage(
        response.uri,
        1280,
        720,
        "JPEG",
        100,
        rotation
      ).then(({ uri }) => {
        const uriResize = uri.replace("file://", "");
        RNFetchBlob.fs.readFile(uriResize, "base64").then((data) => {
          sendImageAvatar(
            data,
            (snapshot: string) => {
              const tamanhoTotal = 0;
            },
            (imgUrl: string) => setAvatar(imgUrl)
          );
        });
      });
    });
  }

  async function validateCep() {
    if (cep.length === 9) {
      try {
        const testi = cep.replace("-", "");
        const response = await axios.get(
          `https://viacep.com.br/ws/${testi}/json`
        );
        setAddress(response.data.logradouro);
        setNeighborhood(response.data.bairro);
        setState(response.data.uf);
        setCity(response.data.localidade);
        setCepError(false);
      } catch (err) {
        setCepError(true);
      }
    }
  }

  const handleBirthDate = (birth: string) => {
    setBirthDate(mask(birth, ["99/99/9999"]));
  };

  const handlePhone = (numPhone: string) => {
    setPhone(mask(numPhone, ["(99) 99999-9999"]));
  };

  const handleCep = (numCep: string) => {
    setCep(mask(numCep, ["99999-999"]));
  };

  const verifyDate = (dia: string) => {
    const verdade = DateHelper.isDate(dia);
    if (!verdade) {
      setIsDate(false);
    } else {
      setIsDate(true);
    }
  };

  const handleCpf = (doc: string) => {
    setCpf(mask(doc, ["999.999.999-99"]));
  };

  const verifyCpf = (doc: string) => {
    if (doc && doc.length === 14) {
      const validDoc = DocHelper.validateDoc(doc);

      if (!validDoc) {
        setIsDoc(false);
      } else {
        setIsDoc(true);
      }
    }
  };

  const { handleChange, handleSubmit, values, errors, isValid } = useFormik({
    validationSchema: AuthContacts,
    initialValues: {
      doc: editingContact[0] ? editingContact[0]?.CPF : "",
      name: editingContact[0] ? editingContact[0]?.Name : "",
      email: editingContact[0] ? editingContact[0]?.Email : "",
      skype: editingContact[0] ? editingContact[0]?.Skype : "",
    },
    onSubmit: () => {
      const oldProfile = editingContact[0];

      const newProfile = {
        ...oldProfile,
        AvatarUrl: avatar,
        Name: values.name,
        Email: values.email,
        Skype: values.skype,
        Birthday: birthDate,
        CPF: values.doc,
        Phones: [
          {
            PhoneNumber: phone,
            TypeId: contactTypeId,
            CountryId: locale.CountryId,
          },
        ],
        OriginId: originId,
        TypeId: contactTypeId,
        ZipCode: cep,
        StreetAddress: address,
        StreetAddressNumber: number,
        StreetAddressLine2: complement,
        Neighborhood: neighborhood,
        CityId: locale.Id,
        StateId: locale.StateId,
        CountryId: locale.CountryId,
      };
      dispatch(
        routeParams
          ? updateContactRequest(newProfile, editingContact[0]?.Id)
          : createContactRequest(
              avatar,
              values.name,
              values.email,
              values.skype,
              birthDate,
              values.doc,
              phone,
              originId,
              contactTypeId,
              cep,
              address,
              number,
              complement,
              neighborhood,
              locale.Id,
              locale.StateId,
              locale.CountryId
            )
      );
      setAvatar("");
      setBirthDate("");
      setPhone("");
      setOriginId("");
      setOriginName("");
      setContactTypeId("");
      setContactTypeName("");
      setAddress("");
      setNumber("");
      setComplement("");
      setNeighborhood("");
    },
  });

  const [contactsOrigins, setContactsOrigins] = useState<IContactsOrigins[]>(
    []
  );
  const [contactsTypes, setContactsTypes] = useState<IContactsTypes[]>([]);

  useEffect(() => {
    dispatch(getOriginsContactsRequest());
  }, []);

  useEffect(() => {
    if (contactsOriginsReducer) {
      let origins: TypeSelectOriginsContacts[] = [];

      contactsOriginsReducer?.map((item) =>
        origins.push({
          label: item?.Name,
          value: item,
        })
      );

      setContactsOrigins(origins);
    }
  }, [contactsOriginsReducer]);

  useEffect(() => {
    dispatch(getTypesContactsRequest());
  }, []);

  useEffect(() => {
    if (contactsTypesReducer) {
      let typesContacts: TypeSelectTypesContacts[] = [];

      contactsTypesReducer?.map((item) =>
        typesContacts.push({
          label: item.Name,
          value: item,
        })
      );

      setContactsTypes(typesContacts);
    }
  }, [contactsTypesReducer]);

  useEffect(() => {
    if (city) {
      dispatch(getCitiesRequest(city));
    }
  }, [city]);

  function handleOrigin(val: any) {
    setOriginId(val.value.Id as number);
    setOriginName(val.value.Name as string);
    setOriginVisible(true);
  }

  function handleType(val: any) {
    setContactTypeId(val.value.Id);
    setContactTypeName(val.value.Name);
    setTypeVisible(true);
  }

  function handleNavigation() {
    dispatch(getEditingContactSuccess([]));
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Loading />
        </View>
      ) : (
        <Container>
          <Body>
            <ContainerLogo>
              <Logo source={logo} />
            </ContainerLogo>

            <Title>Cadastrar Contato</Title>

            <Avatar source={{ uri: `${avatar}` }} />

            <LinkButton
              style={{ alignSelf: "center" }}
              onPress={() => chooseAvatar()}
            >
              Escolha uma foto
            </LinkButton>

            <Input
              ref={nameRef}
              label="Nome"
              placeholder="Digite o Nome"
              iconName="account"
              value={values.name}
              maxLength={250}
              error={!!errors.name}
              returnKeyType="next"
              autoCorrect={false}
              onChangeText={handleChange("name")}
              onSubmitEditing={() => emailRef?.current.focus()}
            />
            {errors.name && <TextAlert>{errors.name}</TextAlert>}

            <Input
              ref={emailRef}
              label="Email"
              placeholder="Digite o e-mail"
              iconName="mail"
              value={values.email}
              maxLength={250}
              keyboardType="email-address"
              error={!!errors.email}
              returnKeyType="next"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={handleChange("email")}
              onSubmitEditing={() => skypeRef?.current.focus()}
            />
            {errors.email && <TextAlert>{errors.email}</TextAlert>}

            <Input
              ref={skypeRef}
              label="Skype"
              placeholder="Digite o Skype"
              iconName="skype"
              value={values.skype}
              maxLength={50}
              error={!!errors.skype}
              returnKeyType="next"
              autoCorrect={false}
              onChangeText={handleChange("skype")}
              onSubmitEditing={() => birthDateRef?.current.focus()}
            />
            {errors.skype && <TextAlert>{errors.skype}</TextAlert>}

            <Input
              ref={birthDateRef}
              label="Data de Nascimento"
              iconName="cake-variant"
              value={birthDate}
              placeholder="Digite a data de nascimento"
              maxLength={250}
              keyboardType={
                Platform.OS === "android"
                  ? "numeric"
                  : "numbers-and-punctuation"
              }
              returnKeyType="next"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={handleBirthDate}
              onEndEditing={() => verifyDate(birthDate)}
              onSubmitEditing={() => docRef?.current.focus()}
            />
            {!isDate && birthDate.length < 10 && birthDate !== "" && (
              <TextAlert>Digite um data válida</TextAlert>
            )}

            <InputMask
              ref={docRef}
              type="cpf"
              label="CPF"
              placeholder="Digite o CPF"
              iconName="mail"
              value={cpf}
              maxLength={14}
              keyboardType={
                Platform.OS === "android"
                  ? "numeric"
                  : "numbers-and-punctuation"
              }
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={handleCpf}
              onEndEditing={() => verifyCpf(cpf)}
              onSubmitEditing={() => phoneRef?.current.focus()}
            />
            {!isDoc && cpf.length < 14 && cpf !== "" && (
              <TextAlert>Digite um data válida</TextAlert>
            )}

            <Input
              ref={phoneRef}
              label="Telefone"
              iconName="phone"
              value={phone as string}
              maxLength={15}
              keyboardType={
                Platform.OS === "android"
                  ? "numeric"
                  : "numbers-and-punctuation"
              }
              placeholder="Digite o telefone"
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={handlePhone}
              onSubmitEditing={() => cepRef?.current.focus()}
            />

            {Platform.OS === "ios" ? (
              <SelectArea onPress={() => setOriginVisible(false)}>
                <SelectLabelArea>
                  <SelectLabel>Origem do Contatos</SelectLabel>
                </SelectLabelArea>
                {originVisible ? (
                  <SelectContainer>
                    <SelectIcon name="home" size={18} color={theme.primary} />
                    <SelectInputIOS>{originName}</SelectInputIOS>
                  </SelectContainer>
                ) : (
                  <PickerIOS
                    selectedValue={originName}
                    onValueChange={(val) => handleOrigin(val)}
                  >
                    {contactsOrigins.map((item) => (
                      <PickerIOS.Item label={item.label} value={item} />
                    ))}
                  </PickerIOS>
                )}
              </SelectArea>
            ) : (
              <SelectArea>
                <SelectLabelArea>
                  <SelectLabel>Origem do Contato</SelectLabel>
                </SelectLabelArea>
                <SelectContainer>
                  <>
                    <SelectIcon name="home" size={18} color={theme.primary} />

                    <SelectInputAndroid
                      selectedValue={originName}
                      onValueChange={(val) => handleOrigin(val)}
                    >
                      {contactsOrigins.map((item) => (
                        <SelectInputAndroid.Item
                          label={item.label}
                          value={item}
                        />
                      ))}
                    </SelectInputAndroid>
                  </>
                </SelectContainer>
              </SelectArea>
            )}

            {Platform.OS === "ios" ? (
              <SelectArea onPress={() => setTypeVisible(false)}>
                <SelectLabelArea>
                  <SelectLabel>Tipo do Contato</SelectLabel>
                </SelectLabelArea>
                {typeVisible ? (
                  <SelectContainer>
                    <SelectIcon name="home" size={18} color={theme.primary} />
                    <SelectInputIOS>{contactTypeName}</SelectInputIOS>
                  </SelectContainer>
                ) : (
                  <PickerIOS
                    selectedValue={contactTypeName}
                    onValueChange={(val) => handleType(val)}
                  >
                    {contactsTypes.map((item) => (
                      <PickerIOS.Item label={item.label} value={item} />
                    ))}
                  </PickerIOS>
                )}
              </SelectArea>
            ) : (
              <SelectArea>
                <SelectLabelArea>
                  <SelectLabel>Tipo do Contato</SelectLabel>
                </SelectLabelArea>
                <SelectContainer>
                  <>
                    <SelectIcon name="home" size={18} color={theme.primary} />

                    <SelectInputAndroid
                      selectedValue={contactTypeName}
                      onValueChange={(value) => handleType(value)}
                    >
                      {contactsTypes.map((item) => (
                        <SelectInputAndroid.Item
                          label={item.label}
                          value={item}
                        />
                      ))}
                    </SelectInputAndroid>
                  </>
                </SelectContainer>
              </SelectArea>
            )}

            <Input
              ref={cepRef}
              label="CEP"
              iconName="city"
              value={cep}
              maxLength={15}
              placeholder="Digite o CEP"
              keyboardType={
                Platform.OS === "android"
                  ? "numeric"
                  : "numbers-and-punctuation"
              }
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={handleCep}
              onEndEditing={() => validateCep()}
            />
            {cepError && <TextAlert>Digite um CEP válido.</TextAlert>}

            {address !== "" && (
              <>
                <Input
                  ref={addressRef}
                  label="Endereço"
                  iconName="home"
                  value={address}
                  maxLength={250}
                  returnKeyType="next"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={setAddress}
                  onSubmitEditing={() => numberRef?.current.focus()}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      width: "30%",
                    }}
                  >
                    <Input
                      ref={numberRef}
                      label="Número"
                      iconName="numeric"
                      value={number}
                      maxLength={10}
                      keyboardType={
                        Platform.OS === "android"
                          ? "numeric"
                          : "numbers-and-punctuation"
                      }
                      returnKeyType="next"
                      returnKeyLabel="next"
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={setNumber}
                      onSubmitEditing={() => complementRef?.current.focus()}
                    />
                  </View>

                  <View
                    style={{
                      width: "65%",
                      marginLeft: 15,
                    }}
                  >
                    <Input
                      ref={complementRef}
                      label="Complemento"
                      iconName="city-variant"
                      value={complement}
                      maxLength={20}
                      returnKeyType="next"
                      returnKeyLabel="next"
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={setComplement}
                      onSubmitEditing={() => neighborhoodRef?.current.focus()}
                    />
                  </View>
                </View>

                <Input
                  ref={neighborhoodRef}
                  label="Bairro"
                  iconName="city-variant"
                  value={neighborhood}
                  maxLength={20}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={setNeighborhood}
                  onSubmitEditing={() => stateRef?.current.focus()}
                />

                <Input
                  ref={stateRef}
                  label="Estado"
                  iconName="city-variant"
                  value={state}
                  maxLength={20}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={setState}
                  onSubmitEditing={() => cityRef?.current.focus()}
                />

                <Input
                  ref={cityRef}
                  label="Cidade"
                  iconName="city-variant"
                  value={city}
                  maxLength={30}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={setCity}
                  onSubmitEditing={handleSubmit}
                />
              </>
            )}

            <Button
              disabled={!isValid}
              loading={loading}
              loadingColor="white"
              onPress={handleSubmit}
            >
              Entrar
            </Button>
          </Body>
          <BackButton
            activeOpacity={0.6}
            style={{
              zIndex: 50,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowOffset: {
                width: 4,
                height: 4,
              },
              elevation: 4,
            }}
            onPress={() => handleNavigation()}
          >
            <Icon name="arrow-left" size={30} color={theme.white} />
          </BackButton>
        </Container>
      )}
    </SafeAreaView>
  );
};

export default CreateContacts;
