import React from "react";
import { s } from "./TabBottomMenu.style";
import { Text, TouchableOpacity, View } from "react-native";
import { TabStatus } from "../../utils/utils";

const TabBottomMenu = ({ todoList, selectedTabName, onPress }) => {
  const countByStatus = todoList.reduce((acc, todo) => {
    todo.isCompleted ? acc.done++ : acc.inProgress++;
    return acc;
  }, { all: todoList.length, inProgress: 0, done: 0 })

  function getTextStyle(tabName) {
    return {
      fontWeight: "bold",
      color: selectedTabName === tabName ? "#2F76E5" : "black"
    }
  }

  return (
    <View style={s.root}>
      <TouchableOpacity onPress={() => onPress(TabStatus.all)}>
        <Text style={getTextStyle(TabStatus.all)}>All ({countByStatus.all})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress(TabStatus.inProgress)}>
        <Text style={getTextStyle(TabStatus.inProgress)}>In progress ({countByStatus.inProgress})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress(TabStatus.done)}>
        <Text style={getTextStyle(TabStatus.done)}>Done ({countByStatus.done})</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBottomMenu;
