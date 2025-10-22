// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Screen01 from "./screens/Screen01";
import Screen02 from "./screens/Screen02";
import Screen03 from "./screens/Screen03";
import Screen04 from "./screens/Screen04";

export type RootStackParamList = {
  Screen01: undefined;
  Screen02: { selectedColor?: string } | undefined;
  Screen03: { selectedColor?: string } | undefined;
  Screen04: { selectedColor?: string } | undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Screen01"
          screenOptions={{ headerShown: true }}
        >
          <Stack.Screen
            name="Screen01"
            component={Screen01}
            options={{ title: "Screen 01" }}
          />
          <Stack.Screen
            name="Screen02"
            component={Screen02}
            options={{ title: "Screen 2" }}
          />
          <Stack.Screen
            name="Screen03"
            component={Screen03}
            options={{ title: "Screen 3" }}
          />
          <Stack.Screen
            name="Screen04"
            component={Screen04}
            options={{ title: "Screen 4" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
