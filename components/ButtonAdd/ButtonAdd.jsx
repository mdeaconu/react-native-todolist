import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { s } from "./ButtonAdd.style";

const ButtonAdd = ({ onPress }) => {
  return (
    <TouchableOpacity style={s.button} onPress={() => onPress()}>
      <Text style={s.text}> + New Todo</Text>
    </TouchableOpacity>
  );
};

export default ButtonAdd;
