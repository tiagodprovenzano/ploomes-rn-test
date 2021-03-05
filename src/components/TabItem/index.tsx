import React, { useRef, forwardRef } from "react";
import type { ButtonProps } from "react-native";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Transition } from "react-native-reanimated";

import theme from "../../styles/themes/theme";

import { Container, Content, Icon, Label } from "./styles";

import transition from "../../animations/Transition";

interface TabProps extends ButtonProps {
  iconName: string;
  label: string;
  accessibilityState: BottomTabBarButtonProps;
}

const TabItem = ({
  label,
  iconName,
  onPress,
  accessibilityState,
}: TabProps) => {
  const ref = useRef<any>();
  const isFocused = accessibilityState.selected;

  return (
    <Container
      onPress={() => {
        ref.current.animateNextTransition();
        onPress();
      }}
    >
      <Content
        style={{
          backgroundColor: isFocused ? theme.primary : theme.white,
        }}
        ref={ref}
        transition={transition}
      >
        <Icon
          name={iconName}
          size={20}
          color={isFocused ? theme.white : theme.primary}
        />
        {isFocused && <Label>{label}</Label>}
      </Content>
    </Container>
  );
};

export default TabItem;
