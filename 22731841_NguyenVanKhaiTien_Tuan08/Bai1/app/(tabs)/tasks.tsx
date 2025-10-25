import React, { useState, useCallback } from "react";
import {
  View, Text, FlatList, TouchableOpacity, TextInput,
  StyleSheet, Alert
} from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import TaskItem from "../components/TaskItem";
import { initDB, fetchTasks, deleteTask, updateTask } from "../../database";

export default function tasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  const loadTasks = useCallback(() => {
    fetchTasks(setTasks);
  }, []);

  useFocusEffect(
    useCallback(() => {
      initDB();
      loadTasks();
    }, [loadTasks])
  );

  const onPressAdd = () => router.push({ pathname: "/add" });

  const onEdit = (task: any) => router.push({ pathname: "/add", params: { id: task.id, name: task.name } });

  const onDelete = (task: any) => {
    Alert.alert("Xóa", "Bạn có muốn xóa mục này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa", style: "destructive", onPress: () => {
          deleteTask(task.id, loadTasks);
        }
      }
    ]);
  };

  const toggleDone = (task: any) => {
    updateTask(task.id, task.name, !task.done, loadTasks);
  };

  const filtered = tasks.filter(t => t.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search" value={query} onChangeText={setQuery} style={styles.search} />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
          <TaskItem task={item} onEdit={() => onEdit(item)} onDelete={() => onDelete(item)} onToggle={() => toggleDone(item)} />
        }
      />
      <TouchableOpacity style={styles.addButton} onPress={onPressAdd}>
        <Text style={{ color: "#fff", fontSize: 28 }}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18 },
  search: { height: 44, borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 8, paddingHorizontal: 10, backgroundColor: "#fff", marginBottom: 12 },
  addButton: { position: "absolute", bottom: 28, alignSelf: "center", backgroundColor: "#0fc4c4", width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center" },
});
