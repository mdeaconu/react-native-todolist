import React from "react";
import { s } from "./CardTodo.sytle";
import { Image, Text, TouchableOpacity } from "react-native";
import checkMark from "../../assets/check.png";

const CardTodo = ({ todo, onPress, onLongPress }) => {
  return (
    <TouchableOpacity
      style={s.card}
      onPress={() => onPress(todo)}
      onLongPress={() => onLongPress(todo)}
    >
      <Text style={[s.title, todo.isCompleted && { textDecorationLine: "line-through" }]}>
        {todo.title}
      </Text>
      {todo.isCompleted && <Image style={s.image} source={checkMark} />}
    </TouchableOpacity>
  );
};

export default CardTodo;
