import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const DropDown = ({ items, placeholder, placeholderFocus, setValue, value }) => {
  const [isFocus, setIsFocus] = useState(false);
  
  return (
    <View>
      <Dropdown
        style={[
          style.card,
          {
            // width: "100%",
            minWidth: 150,
          },
          isFocus && { borderColor: theme == "dark" ? colors["teal"]["800"] : colors["teal"][600] },
        ]}
        containerStyle={{
          borderRadius: 12,
          backgroundColor: "gray",
          borderColor: "gray",
        }}
        activeColor={"red"}
        placeholderStyle={{ color: "gray" }}
        selectedTextStyle={{ color: "black" }}
        data={items}
        maxHeight={400}
        itemTextStyle={style.p}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : placeholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
