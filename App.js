import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import Header from "./components/Header/Header";
import CardTodo from "./components/CardTodo/CardTodo";
import TabBottomMenu from "./components/TabBottomMenu/TabBottomMenu";
import { TabStatus } from "./utils/utils";
import ButtonAdd from "./components/ButtonAdd/ButtonAdd";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";

const App = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Walk the dog", isCompleted: true },
    { id: 2, title: "Go to the dentist", isCompleted: false },
    { id: 3, title: "Learn React Native", isCompleted: false },
  ]);
  const [selectedTabName, setSelectedTabName] = useState(TabStatus.all);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function getFilteredList() {
    switch (selectedTabName) {
      case TabStatus.all:
        return todoList;
      case TabStatus.inProgress:
        return todoList.filter((todo) => !todo.isCompleted);
      case TabStatus.done:
        return todoList.filter((todo) => todo.isCompleted);
    }
  }

  function deleteTodo(todo) {
    Alert.alert(
      "Delete todo",
      "Are you sure you want to delete this todo?",
      [
        {
          text: "Delete",
          sytle: "destructive",
          onPress: () => {
            setTodoList(todoList.filter((t) => t.id !== todo.id));
          }
        },
        { text: "Cancel", style: "cancel" }
      ]
    );
  }

  function renderTodoList() {
    return getFilteredList().map((todo) => (
      <View key={todo.id} style={s.cardItem}>
        <CardTodo onLongPress={deleteTodo} onPress={updateTodo} todo={todo} />
      </View>
    ));
  }

  function updateTodo(todoToUpdate) {
    setTodoList((prevTodoList) => {
      const todoIndex = prevTodoList.findIndex((item) => item.id === todoToUpdate.id);

      if (todoIndex === -1) {
        console.error(`Todo with id ${todoToUpdate.id} not found.`);
        return prevTodoList; // Return the previous state if the todo is not found
      }

      const updatedTodo = {
        ...prevTodoList[todoIndex],
        isCompleted: !prevTodoList[todoIndex].isCompleted,
      };

      return [
        ...prevTodoList.slice(0, todoIndex), // Items before the updated todo
        updatedTodo, // The updated todo
        ...prevTodoList.slice(todoIndex + 1), // Items after the updated todo
      ];
    });
  }

  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false
    }

    setTodoList([...todoList, newTodo]);
    setIsDialogVisible(false);
    setInputValue("");
  }

  function renderAddDialog() {
    return (
      <Dialog.Container
        visible={isDialogVisible}
        onBackdropPress={() => setIsDialogVisible(false)}
      >
        <Dialog.Title>Add todo</Dialog.Title>
        <Dialog.Description>Choose a name for your todo</Dialog.Description>
        <Dialog.Input placeholder="Ex: Go to the dentist" onChangeText={setInputValue} />
        <Dialog.Button label="Cancel" color="grey" onPress={() => setIsDialogVisible(false)} />
        <Dialog.Button label="Save" onPress={addTodo} disabled={inputValue.length === 0} />
      </Dialog.Container>
    );
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <ScrollView>
              {renderTodoList()}
            </ScrollView>
          </View>
          <ButtonAdd onPress={() => setIsDialogVisible(true)} />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TabBottomMenu
          todoList={todoList}
          selectedTabName={selectedTabName}
          onPress={setSelectedTabName}
        />
      </View>
      {renderAddDialog()}
    </>
  );
};

export default App;
