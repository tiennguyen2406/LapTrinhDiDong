import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createTables } from "../database/db";
import { getAllTransactions } from "../database/transactionQueries";
import { useRouter, useFocusEffect } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);

  // Tạo bảng khi mở app lần đầu
  useFocusEffect(
    useCallback(() => {
      const initAndFetch = async () => {
        await createTables();
        const data = await getAllTransactions();
        setTransactions(data);
      };
      initAndFetch();
    }, [])
  );

  // Hiển thị từng item
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => router.push({ pathname: "/edit", params: { id: item.id } })}
      style={[
        styles.item,
        item.type === "income" ? styles.income : styles.expense,
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text
        style={[
          styles.amount,
          item.type === "income" ? styles.textIncome : styles.textExpense,
        ]}
      >
        {item.type === "income" ? "+" : "-"} {item.amount} ₫
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>💰 EXPENSE TRACKER</Text>

        {transactions.length === 0 ? (
          <Text style={styles.empty}>Chưa có giao dịch nào</Text>
        ) : (
          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}

        {/* Nút thêm giao dịch */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/add")}
        >
          <Text style={styles.addText}>＋</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f6fa" },
  container: { flex: 1, padding: 16 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  income: { borderLeftWidth: 5, borderLeftColor: "#4cd137" },
  expense: { borderLeftWidth: 5, borderLeftColor: "#e84118" },
  title: { fontSize: 16, fontWeight: "600" },
  date: { color: "#777", fontSize: 12, marginTop: 2 },
  amount: { fontSize: 18, fontWeight: "bold" },
  textIncome: { color: "#2ecc71" },
  textExpense: { color: "#e74c3c" },
  empty: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 16,
    color: "#888",
  },
  addButton: {
    position: "absolute",
    right: 24,
    bottom: 24,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  addText: { color: "#fff", fontSize: 32, marginTop: -3 },
});
