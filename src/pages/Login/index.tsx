import React, { useRef } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import AuthLogin from "../../validations/authLogin";

import Button from "../../components/Button";
import Input from "../../components/Input";
import TextAlert from "../../components/TextAlert";

import logo from "../../assets/logo.png";

import type { StoreState } from "../../store";

import { signInRequest } from "../../store/modules/auth/actions";

import { Container, ContainerLogo, Logo } from "./styles";

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state: StoreState) => state.auth.loading);

  const passwordRef = useRef<any>(null);

  const { handleChange, handleSubmit, values, errors, isValid } = useFormik({
    validationSchema: AuthLogin,
    initialValues: {
      email: "candidato.mobile.300@teste.com",
      password: "1234",
      // email: '',
      // password: '',
    },
    onSubmit: () => {
      dispatch(signInRequest(values.email, values.password));
    },
  });

  return (
    <Container>
      <ContainerLogo>
        <Logo source={logo} />
      </ContainerLogo>

      <Input
        label="Email"
        iconName="email"
        value={values.email}
        maxLength={100}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        error={!!errors.email}
        returnKeyType="next"
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={handleChange("email")}
        onSubmitEditing={() => passwordRef?.current.focus()}
      />
      {errors.email && <TextAlert>{errors.email}</TextAlert>}

      <Input
        ref={passwordRef}
        label="Senha"
        iconName="lock"
        secureTextEntry
        value={values.password}
        maxLength={50}
        placeholder="Digite sua senha"
        error={!!errors.password}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="send"
        onChangeText={handleChange("password")}
        onSubmitEditing={handleSubmit}
      />
      {errors.password && <TextAlert>{errors.password}</TextAlert>}

      <Button
        disabled={!isValid}
        loading={loading}
        loadingColor="white"
        onPress={handleSubmit}
      >
        Entrar
      </Button>
    </Container>
  );
};

export default Login;
