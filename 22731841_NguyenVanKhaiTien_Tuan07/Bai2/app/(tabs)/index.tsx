import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();
  const [name, setName] = useState("");

  const onGetStarted = () => {
    router.push({
      pathname: "/tasks",
      params: { name: name || "Twinkle" },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <Image
        source={require('../../assets/images/Image 95.png')}
        style={styles.image}
      />
      <Text style={styles.title}>MANAGE YOUR{"\n"}TASK</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onGetStarted}>
        <Text style={styles.buttonText}>GET STARTED ➜</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 120,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    color: "#8b5cf6",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 40,
  },
  inputWrapper: {
    width: "100%",
    marginVertical: 20,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  button: {
    marginTop: 40,
    backgroundColor: "#00c6c6",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});