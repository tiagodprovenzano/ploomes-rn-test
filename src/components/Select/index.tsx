import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
  useState,
  useCallback,
} from "react";
import { TextInputProps, StyleSheetProperties, View } from "react-native";

import theme from "../../styles/themes/theme";

import { Container, SelectInput, Icon, Label } from "./styles";

interface InputProps extends TextInputProps {
  iconName: string;
  label?: string;
  error?: boolean;
  type: boolean;
}

interface InputRef {
  focus(): void;
}

const Select: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { type, iconName, label, error, ...rest },
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

          <SelectInput
          // ref={inputRef}
          // placeholderTextColor={theme.gray}
          // onFocus={() => setFocus(true)}
          // onBlur={() => handleInputBlur()}
          // {...rest}
          ></SelectInput>
        </>
      </Container>
    </>
  );
};

export default forwardRef(Select);
