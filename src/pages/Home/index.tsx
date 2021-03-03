import React, { useContext, useEffect, useState, useRef } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Alert,
  View,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { mask } from "remask";
import RNFetchBlob from "rn-fetch-blob";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import RNPickerSelect from "react-native-picker-select";

import {
  IContactsOrigins,
  IFields,
  IFieldsEntities,
} from "@ploomes/ploomeststypes";
import Icon from "react-native-vector-icons/FontAwesome";

import { userKey } from "../../config";

import api from "../../services/api";

import logo from "../../assets/logo.png";
import userImg from "../../assets/pinguin.png";

import AuthContacts from "../../validations/authContacts";

import DateHelper from "../../helpers/dateValidate";

import type { StoreState } from "../../store";

import { sendImageAvatar } from "../../utils/sendImageAvatar";

import { signOutRequest } from "../../store/modules/auth/actions";
import {
  createContactRequest,
  getCitiesRequest,
} from "../../store/modules/contacts/actions";

import theme from "../../styles/themes/theme";

import Button from "../../components/Button";
import LinkButton from "../../components/LinkButton";
import Input from "../../components/Input";
import InputMask from "../../components/InputMask";
import TextAlert from "../../components/TextAlert";
import SelectOriginsContacts from "../../components/SelectOriginsContacts";

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

interface TypeSelectOriginsContacts {
  label: string | undefined;
  value: string | undefined;
}

const Home = () => {
  const dispatch = useDispatch();

  const nameRef = useRef<any>(null);
  const docRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
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

  const [avatar, setAvatar] = useState("");
  const [birthDate, setBirthDate] = useState("11/11/1989");
  const [address, setAdress] = useState("");
  const [number, setNumber] = useState("");
  const [originId, setOriginId] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cep, setCep] = useState("");
  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState(false);
  const [eDia, seteDia] = useState(true);
  const [cepError, setCepError] = useState(false);
  const [phoneValid, setPhoneValid] = useState("");

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
      seteDia(false);
    } else {
      seteDia(true);
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
      doc: "088.039.150-28",
      name: "Vinicius",
      email: "vini2@vini.com",
      zipCode: "1234",
      originId: "1234",
      // email: '',
      // password: '',
    },
    onSubmit: () => {
      console.log(values);
      // dispatch(createContactRequest(
      //   name,
      //   neighborhood,
      //   zipCode,
      //   originId,
      //   companyId,
      //   streetAddressNumber,
      //   typeId,
      //   phoneNumber,
      //   phoneTypeId,
      //   countryId,
      //   fieldKey,
      //   stringValue,
      // ));
    },
  });

  // const [fields, setFields] = useState<IFields[]>([]);
  const [contactsOrigins, setContactsOrigins] = useState<IContactsOrigins[]>(
    []
  );
  // const [fieldsEntities, setFieldsEntities] = useState<IFieldsEntities[]>([]);
  const [newOriginsContacts, setNewOriginsContacts] = useState<
    TypeSelectOriginsContacts[]
  >([]);
  // const [fieldsEntities, setFieldsEntities] = useState<IFieldsEntities[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     const response = await api.get("Fields@Types", {
  //       headers: {
  //         "User-Key": userKey,
  //       },
  //     });

  //     setFields(response.data.value);
  //     console.tron.log("Fields@Types", response.data.value);
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      const response = await api.get("Contacts@Origins", {
        headers: {
          "User-Key": userKey,
        },
      });

      setContactsOrigins(response.data.value);
      // console.tron.log("Contacts@Origins", response.data.value);
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const response = await api.get(`Fields@Entities?$top=10`, {
  //       headers: {
  //         "User-Key": userKey,
  //       },
  //     });

  //     setFieldsEntities(response.data.value);
  //     console.tron.log("Fields@Entities", response.data.value);
  //   })();
  // }, []);

  function handleSignOut() {
    dispatch(signOutRequest());
  }

  useEffect(() => {
    if (contactsOrigins) {
      let origins: TypeSelectOriginsContacts[] = [];

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

  useEffect(() => {
    if (contactsOrigins) {
      let origins: TypeSelectOriginsContacts[] = [];

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
    <Container>
      <Body>
        <ContainerLogo>
          <Logo source={logo} />
        </ContainerLogo>

        <Title>Cadastrar Contato</Title>

        {avatar ? (
          <Avatar source={{ uri: `${avatar}` }} />
        ) : (
          <Avatar source={userImg} />
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
          onSubmitEditing={() => birthDateRef?.current.focus()}
        />
        {touched.email && errors.email && <TextAlert>{errors.email}</TextAlert>}

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
        {!eDia && birthDate.length < 10 && (
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
          value={phone}
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
          error={!!errors.originId}
          onValueChange={(value) => console.log(value)}
          items={newOriginsContacts}
          // onSubmitEditing={() => passwordRef?.current.focus()}
        />
        {errors.originId && <TextAlert>{errors.originId}</TextAlert>} */}

        {Platform.OS === "ios" ? (
          <SelectArea>
            <SelectLabelArea>
              <SelectLabel>Origem do Contato</SelectLabel>
            </SelectLabelArea>
            <SelectContainer error={!!errors.originId}>
              <>
                <SelectIcon name="home" size={18} color={theme.primary} />

                <SelectInputIOS>
                  {newOriginsContacts.map((item) => (
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
            <SelectContainer error={!!errors.originId}>
              <>
                <SelectIcon name="home" size={18} color={theme.primary} />

                <SelectInputAndroid
                  selectedValue={values.originId}
                  onValueChange={handleChange("originId")}
                >
                  {newOriginsContacts.map((item) => (
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
        {/* <SelectArea>
          <SelectLabelArea>
            <SelectLabel>Origem do Contato</SelectLabel>
          </SelectLabelArea>
          <SelectContainer error={!!errors.originId}>
            <>
              <SelectIcon name="home" size={18} color={theme.primary} />

              {Platform.OS === "ios" ? (
                <SelectInputIOS>
                  {newOriginsContacts.map((item) => (
                    <SelectInputIOS.Item
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </SelectInputIOS>
              ) : (
                <SelectInputAndroid>
                  {newOriginsContacts.map((item) => (
                    <SelectInputAndroid.Item
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </SelectInputAndroid>
              )}
            </>
          </SelectContainer>
        </SelectArea> */}

        {errors.originId && <TextAlert>{errors.originId}</TextAlert>}

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
  );
};

export default Home;
