import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
  useState,
  useCallback,
} from "react";
import { View } from "react-native";
import {
  TextInputMaskOptionProp,
  TextInputMaskProps,
} from "react-native-masked-text";

import theme from "../../styles/themes/theme";

import { Container, TextInput, Icon, Label } from "./styles";

interface InputProps extends TextInputMaskProps {
  iconName: string;
  label?: string;
  error?: boolean;
  options?: TextInputMaskOptionProp;
}

interface InputRef {
  focus(): void;
}

const InputMask: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { iconName, label, error, options, ...rest },
  ref
) => {
  const inputRef = useRef<any>();
  const [focus, setFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
  }));

  const handleInputBlur = useCallback(() => {
    setFocus(false);

    setIsFilled(!!inputRef.current.value);
  }, []);

  return (
    <>
      <View style={{ alignSelf: "flex-start" }}>
        <Label>{label}</Label>
      </View>
      <Container error={error} isFocused={focus}>
        <>
          <Icon
            name={iconName}
            size={18}
            color={focus || isFilled ? theme.primary : theme.gray}
          />

          <TextInput
            ref={inputRef}
            options={options}
            placeholderTextColor={theme.gray}
            onFocus={() => setFocus(true)}
            onBlur={() => handleInputBlur()}
            {...rest}
          />
        </>
      </Container>
    </>
  );
};

export default forwardRef(InputMask);
