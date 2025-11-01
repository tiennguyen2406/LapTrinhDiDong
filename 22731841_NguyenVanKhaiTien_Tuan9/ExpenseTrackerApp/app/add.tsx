import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addTransaction } from "../database/transactionQueries";
import { useRouter } from "expo-router";

export default function AddScreen() {
  const router = useRouter();

  // State lưu dữ liệu
  const [type, setType] = useState<"income" | "expense">("expense");

  // Dùng useRef để clear input sau khi thêm
  const titleRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // Hàm thêm dữ liệu vào SQLite
  const handleSave = async () => {
    if (!title.trim() || !amount.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const date = new Date().toLocaleDateString("vi-VN");
    const numericAmount = parseFloat(amount);

    try {
      await addTransaction(title, numericAmount, type, date);

      Alert.alert("✅ Thành công", "Đã lưu giao dịch!");
      // Xóa nội dung ô nhập
      if (titleRef.current) titleRef.current.clear();
      if (amountRef.current) amountRef.current.clear();

      setTitle("");
      setAmount("");

      // Quay lại màn hình chính
      router.back();
    } catch (error) {
      console.error("Lỗi khi thêm:", error);
      Alert.alert("❌ Thất bại", "Không thể lưu giao dịch!");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>➕ Thêm giao dịch mới</Text>

        <TextInput
          ref={titleRef}
          placeholder="Tên giao dịch"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <TextInput
          ref={amountRef}
          placeholder="Số tiền"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />

        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeBtn,
              type === "income" && styles.typeActiveIncome,
            ]}
            onPress={() => setType("income")}
          >
            <Text
              style={[
                styles.typeText,
                type === "income" && styles.textActiveIncome,
              ]}
            >
              Thu
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeBtn,
              type === "expense" && styles.typeActiveExpense,
            ]}
            onPress={() => setType("expense")}
          >
            <Text
              style={[
                styles.typeText,
                type === "expense" && styles.textActiveExpense,
              ]}
            >
              Chi
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>💾 Lưu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f6fa" },
  container: { flex: 1, padding: 20 },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  typeBtn: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  typeActiveIncome: {
    backgroundColor: "#4cd137",
    borderColor: "#4cd137",
  },
  typeActiveExpense: {
    backgroundColor: "#e84118",
    borderColor: "#e84118",
  },
  typeText: {
    color: "#333",
    fontWeight: "600",
  },
  textActiveIncome: { color: "#fff" },
  textActiveExpense: { color: "#fff" },
  saveBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
