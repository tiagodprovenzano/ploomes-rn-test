import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, Alert, View, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { mask } from "remask";
import RNFetchBlob from "rn-fetch-blob";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import { useRoute } from "@react-navigation/native";
// import RNPickerSelect from "react-native-picker-select";

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

import type { StoreState } from "../../store";

import { sendImageAvatar } from "../../utils/sendImageAvatar";

import {
  createContactRequest,
  getOriginsContactsRequest,
  getTypesContactsRequest,
  getOriginContactRequest,
  getTypeContactRequest,
  getCitiesRequest,
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
} from "./styles";

interface TypeSelectOriginsContacts extends IContactsOrigins {
  label: string | undefined;
  value: string | undefined;
  id: number | undefined;
}

interface TypeSelectTypesContacts {
  label: string;
  value: string;
  id: number;
}

interface RouteParams extends IContactsPhones {
  contact: IContacts;
}

const CreateContacts = () => {
  const dispatch = useDispatch();

  const route = useRoute();

  const routeParams = route.params as RouteParams;

  console.tron.log({ routeParams });

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

  const loading = useSelector((state: StoreState) => state.contacts.loading);
  const contactsOriginsReducer = useSelector(
    (state: StoreState): IContactsOrigins[] => state.contacts.contactsOrigins
  );
  const contactsTypesReducer = useSelector(
    (state: StoreState): IContactsTypes[] => state.contacts.contactsTypes
  );
  const contactOriginReducer = useSelector(
    (state: StoreState): IContactsOrigins => state.contacts.contactOrigin
  );
  const contactTypeReducer = useSelector(
    (state: StoreState): IContactsTypes => state.contacts.contactType
  );
  const locale = useSelector(
    (state: StoreState): ICities => state.contacts.locale
  );

  const [avatar, setAvatar] = useState("");
  const [birthDate, setBirthDate] = useState(
    routeParams?.contact?.Birthday ? routeParams?.contact?.Birthday : ""
  );
  const [address, setAdress] = useState("");
  const [number, setNumber] = useState("");
  const [originId, setOriginId] = useState(
    routeParams?.contact?.Type?.Id ? routeParams?.contact?.TypeId : ""
  );
  const [contactTypeId, setContactTypeId] = useState(
    routeParams?.contact?.Origin?.Id ? routeParams?.contact?.OriginId : ""
  );
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cep, setCep] = useState("");
  const [phone, setPhone] = useState<IContactsPhones>(
    routeParams?.contact?.Phones[0]?.PhoneNumber
      ? routeParams?.contact?.Phones[0]?.PhoneNumber
      : ""
  );
  const [checked, setChecked] = useState(false);
  const [isDate, setIsDate] = useState(true);
  const [cepError, setCepError] = useState(false);
  const [phoneValid, setPhoneValid] = useState("");

  const avatarDefault =
    "https://s3-sa-east-1.amazonaws.com/ploomescrm/avatar_default.jpg";

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
        setAdress(response.data.logradouro);
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

  const {
    handleChange,
    handleSubmit,
    setFieldTouched,
    touched,
    values,
    errors,
    isValid,
  } = useFormik({
    validationSchema: AuthContacts,
    initialValues: {
      doc: routeParams?.contact.CPF ? routeParams?.contact?.CPF : "",
      name: routeParams?.contact?.Name ? routeParams?.contact?.Name : "",
      email: routeParams?.contact.Email ? routeParams?.contact?.Email : "",
      skype: routeParams?.contact.Skype ? routeParams?.contact?.Skype : "",
      zipCode: routeParams?.contact.ZipCode
        ? routeParams?.contact?.ZipCode
        : "",
    },
    onSubmit: () => {
      dispatch(
        createContactRequest({
          avatarUrl: avatar ? avatar : avatarDefault,
          name: values.name,
          email: values.email,
          skype: values.skype,
          birthday: birthDate,
          cpf: values.doc,
          phoneNumber: phone,
          originId,
          typeId: contactTypeId,
          zipCode,
          streetAddress: address,
          streetAddressNumber: number,
          streetAddressLine2: complement,
          neighborhood,
          cityId: locale.Id,
          stateId: locale.StateId,
          countryId: locale.CountryId,
        })
      );
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
          value: item?.Name,
          id: item?.Id,
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
          value: item?.Name,
          id: item?.Id,
        })
      );

      setContactsTypes(typesContacts as TypeSelectTypesContacts[]);
    }
  }, [contactsTypesReducer]);

  useEffect(() => {
    if (city) {
      dispatch(getCitiesRequest(city));
    }
  }, [city]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Body>
          <ContainerLogo>
            <Logo source={logo} />
          </ContainerLogo>

          <Title>Cadastrar Contato</Title>

          {avatar ? (
            <Avatar source={{ uri: `${avatar}` }} />
          ) : (
            <Avatar source={{ uri: `${avatarDefault}` }} />
          )}
          <LinkButton
            style={{ alignSelf: "center" }}
            onPress={() => chooseAvatar()}
          >
            Escolha uma foto
          </LinkButton>

          <Input
            ref={nameRef}
            label="Nome"
            iconName="account"
            value={values.name}
            maxLength={250}
            error={!!errors.name}
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={handleChange("name")}
            onBlur={() => setFieldTouched("name")}
            onSubmitEditing={() => emailRef?.current.focus()}
          />
          {touched.name && errors.name && <TextAlert>{errors.name}</TextAlert>}

          <Input
            ref={emailRef}
            label="Email"
            iconName="mail"
            value={values.email}
            maxLength={250}
            keyboardType="email-address"
            error={!!errors.email}
            returnKeyType="next"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={handleChange("email")}
            onBlur={() => setFieldTouched("email")}
            onSubmitEditing={() => skypeRef?.current.focus()}
          />
          {touched.email && errors.email && (
            <TextAlert>{errors.email}</TextAlert>
          )}

          <Input
            ref={skypeRef}
            label="Skype"
            iconName="skype"
            value={values.skype}
            maxLength={50}
            error={!!errors.skype}
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={handleChange("skype")}
            onBlur={() => setFieldTouched("skype")}
            onSubmitEditing={() => birthDateRef?.current.focus()}
          />
          {touched.skype && errors.skype && (
            <TextAlert>{errors.skype}</TextAlert>
          )}

          <Input
            ref={birthDateRef}
            label="Data de Nascimento"
            iconName="cake-variant"
            value={birthDate}
            maxLength={250}
            keyboardType={
              Platform.OS === "android" ? "numeric" : "numbers-and-punctuation"
            }
            returnKeyType="next"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={handleBirthDate}
            onBlur={() => verifyDate(birthDate)}
            onSubmitEditing={() => docRef?.current.focus()}
          />
          {!isDate && birthDate.length < 10 && (
            <TextAlert>Digite um data válida</TextAlert>
          )}

          <InputMask
            type="cpf"
            label="CPF"
            iconName="mail"
            value={values.doc}
            maxLength={250}
            keyboardType={
              Platform.OS === "android" ? "numeric" : "numbers-and-punctuation"
            }
            error={!!errors.doc}
            returnKeyType="next"
            returnKeyLabel="next"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={handleChange("doc")}
            onBlur={() => setFieldTouched("doc")}
            onSubmitEditing={() => phoneRef?.current.focus()}
          />
          {touched.doc && errors.doc && <TextAlert>{errors.doc}</TextAlert>}

          <Input
            ref={phoneRef}
            label="Telefone"
            iconName="phone"
            value={phone as string}
            maxLength={15}
            keyboardType={
              Platform.OS === "android" ? "numeric" : "numbers-and-punctuation"
            }
            placeholder="(11) 99999-9999"
            returnKeyType="next"
            returnKeyLabel="next"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={handlePhone}
            onSubmitEditing={() => cepRef?.current.focus()}
          />

          {/* <SelectOriginsContacts
          label="Origem do Contato"
          iconName="home"
          // value={originId}
          placeholder={"Escolha a origem do contato"}
          onValueChange={(value) => console.log(value)}
          items={contactsOrigins}
          // onSubmitEditing={() => passwordRef?.current.focus()}
        /> */}

          {Platform.OS === "ios" ? (
            <SelectArea>
              <SelectLabelArea>
                <SelectLabel>Origem do Contato</SelectLabel>
              </SelectLabelArea>
              <SelectContainer>
                <>
                  <SelectIcon name="home" size={18} color={theme.primary} />

                  <SelectInputIOS
                    selectedValue={originId}
                    onValueChange={(val) => setOriginId(val)}
                  >
                    {contactsOrigins.map((item) => (
                      <SelectInputIOS.Item
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </SelectInputIOS>
                </>
              </SelectContainer>
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
                    selectedValue={originId}
                    onValueChange={(val) => setOriginId(val)}
                  >
                    {contactsOrigins.map((item) => (
                      <SelectInputAndroid.Item
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </SelectInputAndroid>
                </>
              </SelectContainer>
            </SelectArea>
          )}

          {Platform.OS === "ios" ? (
            <SelectArea>
              <SelectLabelArea>
                <SelectLabel>Tipo do Contato</SelectLabel>
              </SelectLabelArea>
              <SelectContainer>
                <>
                  <SelectIcon name="home" size={18} color={theme.primary} />

                  <SelectInputIOS
                    selectedValue={contactTypeId}
                    onValueChange={(val) => setContactTypeId(val)}
                  >
                    {contactsOrigins.map((item) => (
                      <SelectInputIOS.Item
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </SelectInputIOS>
                </>
              </SelectContainer>
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
                    selectedValue={contactTypeId}
                    onValueChange={(value) => setContactTypeId(value)}
                  >
                    {contactsTypes.map((item) => (
                      <SelectInputAndroid.Item
                        label={item.label as TypeSelectTypesContacts}
                        value={item.value as TypeSelectTypesContacts}
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
            secureTextEntry
            value={cep}
            maxLength={15}
            placeholder="Digite sua senha"
            keyboardType={
              Platform.OS === "android" ? "numeric" : "numbers-and-punctuation"
            }
            returnKeyType="next"
            returnKeyLabel="next"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={handleCep}
            onBlur={() => validateCep()}
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
                onChangeText={setAdress}
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
      </Container>
    </SafeAreaView>
  );
};

export default CreateContacts;
