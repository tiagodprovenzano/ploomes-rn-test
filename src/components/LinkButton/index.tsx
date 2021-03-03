import React from "react";
import type { TouchableOpacityProps } from "react-native";
import { Container, LinkButtonText } from "./styles";

interface LinkButtonProps extends TouchableOpacityProps {
  children: string;
}

const LinkButton = ({ children, ...rest }: LinkButtonProps) => {
  return (
    <Container activeOpacity={0.7} {...rest}>
      <LinkButtonText>{children}</LinkButtonText>
    </Container>
  );
};

export default LinkButton;
