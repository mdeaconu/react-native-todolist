import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>hello</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

