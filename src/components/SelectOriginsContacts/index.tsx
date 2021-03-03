import React, { forwardRef } from "react";
import { View } from "react-native";
// import type { PickerSelectProps } from "react-native-picker-select";
import { IContactsOrigins } from "@ploomes/ploomeststypes";
import { PickerProps } from "@react-native-picker/picker/typings/Picker";

import theme from "../../styles/themes/theme";

import { Container, SelectInput, Icon, Label } from "./styles";

interface SelectProps extends PickerProps, IContactsOrigins {
  iconName: string;
  label?: string;
  error?: boolean;
}

const SelectOriginsContacts = ({
  iconName,
  label,
  error,
  ...rest
}: SelectProps) => {
  return (
    <View>
      <View style={{ alignSelf: "flex-start" }}>
        <Label>{label}</Label>
      </View>
      <Container error={error}>
        <>
          <Icon name={iconName} size={18} color={theme.primary} />

          <SelectInput {...rest}>
            <SelectInput.Item label="Java" value="java" />
          </SelectInput>
        </>
      </Container>
    </View>
  );
};

export default SelectOriginsContacts;
