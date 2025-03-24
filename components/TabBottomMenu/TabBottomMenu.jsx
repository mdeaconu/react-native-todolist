import React from "react";
import { s } from "./TabBottomMenu.style";
import { Text, TouchableOpacity, View } from "react-native";
import { TabStatus } from "../../utils/utils";

const TabBottomMenu = ({ selectedTabName, onPress }) => {
  function getTextStyle(tabName) {
    return {
      fontWeight: "bold",
      color: selectedTabName === tabName ? "#2F76E5" : "black"
    }
  }

  return (
    <View style={s.root}>
      <TouchableOpacity onPress={() => onPress(TabStatus.all)}>
        <Text style={getTextStyle(TabStatus.all)}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress(TabStatus.inProgress)}>
        <Text style={getTextStyle(TabStatus.inProgress)}>In progress</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress(TabStatus.done)}>
        <Text style={getTextStyle(TabStatus.done)}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBottomMenu;
