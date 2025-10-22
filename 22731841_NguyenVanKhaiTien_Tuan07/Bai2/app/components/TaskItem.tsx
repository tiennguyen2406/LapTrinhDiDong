import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

type AnyItem = Record<string, any>;

export default function TaskItem({
  task,
  onEdit,
  onDelete,
  onToggle,
}: {
  task: AnyItem;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  const label = task?.name || task?.title || task?.productName || "Untitled";
  const img = task?.image || task?.avatar || task?.photo || null;

  return (
    <View style={styles.wrapper}>
      <View style={styles.left}>
        <TouchableOpacity
          onPress={onToggle}
          style={[styles.checkbox, task.done && styles.checked]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {task.done ? <Text style={{ color: "#fff" }}>✓</Text> : null}
        </TouchableOpacity>

        {img ? <Image source={{ uri: img }} style={styles.thumb} /> : null}

        <Text style={[styles.title, task.done && styles.titleDone]} numberOfLines={2}>
          {label}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onEdit}
          style={styles.actionBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={{ color: "#ef4444", fontWeight: "700" }}>✎</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDelete}
          style={styles.actionBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={{ color: "#9ca3af", fontWeight: "700" }}>🗑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 6,
    marginVertical: 8,
    padding: 12,
    borderRadius: 16,
    elevation: 3,
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#9ca3af",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checked: {
    backgroundColor: "#86efac",
    borderColor: "#86efac",
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    flexShrink: 1,
  },
  titleDone: {
    textDecorationLine: "line-through",
    color: "#6b7280",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    marginLeft: 10,
  },
});