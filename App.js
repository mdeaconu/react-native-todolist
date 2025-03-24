import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import Header from "./components/Header/Header";
import CardTodo from "./components/CardTodo/CardTodo";

const App = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Walk the dog", isCompleted: true },
    { id: 2, title: "Go to the dentist", isCompleted: false },
    { id: 3, title: "Learn React Native", isCompleted: false },
  ]);

  function renderTodoList() {
    return todoList.map((todo) => (
      <View key={todo.id} style={s.cardItem}>
        <CardTodo onPress={updateTodo} todo={todo} />
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
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Text>Footer</Text>
      </View>
    </>
  );
};

export default App;
