import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { insertTask, updateTask, fetchTasks } from "../../database";

export default function add() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id ? Number(params.id) : undefined;

  const [value, setValue] = useState("");

  useEffect(() => {
    if (id) {
      fetchTasks(tasks => {
        const task = tasks.find(t => t.id === id);
        if (task) setValue(task.name);
      });
    }
  }, [id]);

  const onFinish = () => {
    if (!value.trim()) { Alert.alert("Chú ý", "Nhập nội dung"); return; }
    if (id) {
      updateTask(id, value, false, () => router.back());
    } else {
      insertTask(value, () => router.back());
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: "padding", android: undefined })} style={styles.container}>
      <TextInput placeholder="Input your task" value={value} onChangeText={setValue} style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={onFinish}>
        <Text style={styles.buttonText}>FINISH ➜</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22, backgroundColor: "#fff" },
  input: { height: 44, borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 8, paddingHorizontal: 12, marginBottom: 20 },
  button: { backgroundColor: "#12b8bd", paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700" },
});
