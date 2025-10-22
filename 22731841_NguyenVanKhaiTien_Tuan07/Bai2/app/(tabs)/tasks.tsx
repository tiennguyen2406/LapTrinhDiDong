import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
    Image
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import TaskItem from "../components/TaskItem";

const API_BASE = "https://68e726ac10e3f82fbf3e26b0.mockapi.io/product";

type AnyItem = Record<string, any>;

export default function TasksScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const name = (params.name as string) || "Twinkle";

    const [items, setItems] = useState<AnyItem[]>([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(API_BASE);
            if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (e) {
            console.warn("Fetch failed", e);
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchItems();
        }, [fetchItems])
    );

    const onPressAdd = () => {
        router.push({ pathname: "/add", params: { name } });
    };

    const onEdit = (id: string) => {
        router.push({ pathname: "/add", params: { id, name } });
    };

    const deleteItem = (id: string) => {
        Alert.alert("Xóa", "Bạn có muốn xóa mục này?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa",
                style: "destructive",
                onPress: async () => {
                    // Optimistic update: remove locally first
                    const previous = items;
                    setItems((prev) => prev.filter((i) => i.id !== id));

                    try {
                        console.log("[DELETE] sending request for id:", id);
                        const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
                        const text = await res.text();
                        console.log("[DELETE] status:", res.status, "body:", text);
                        if (!res.ok) {
                            // revert
                            setItems(previous);
                            Alert.alert("Lỗi", "Xóa không thành công (server).");
                            return;
                        }
                        // success — optionally refetch to sync server state
                        await fetchItems();
                    } catch (e) {
                        console.warn("Delete failed", e);
                        // revert local
                        setItems(previous);
                        Alert.alert("Lỗi", "Xóa không thành công (mạng).");
                    }
                },
            },
        ]);
    };

    const toggleDone = async (item: AnyItem) => {
        const previous = items;
        // optimistic toggle locally for snappy UI
        setItems((prev) => prev.map((p) => (p.id === item.id ? { ...p, done: !p.done } : p)));

        try {
            const updated = { ...item, done: !item.done };
            const res = await fetch(`${API_BASE}/${item.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated),
            });
            const text = await res.text();
            console.log("[TOGGLE] status:", res.status, "body:", text);
            if (!res.ok) {
                setItems(previous);
                Alert.alert("Lỗi", "Cập nhật trạng thái không thành công.");
                return;
            }
            await fetchItems();
        } catch (e) {
            console.warn("Toggle failed", e);
            setItems(previous);
            Alert.alert("Lỗi", "Cập nhật trạng thái không thành công (mạng).");
        }
    };

    const filtered = items.filter((it) =>
        ((it.name || it.title || it.productName || "") as string)
            .toLowerCase()
            .includes(query.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Image
                    source={require('../../assets/images/Frame.png')}
                    style={styles.image}
                />
                <View>
                    <Text style={styles.avatarName}>Hi {name}</Text>
                    <Text style={styles.smallText}>Have a great day a head</Text>
                </View>
            </View>

            <TextInput
                placeholder="Search"
                style={styles.search}
                value={query}
                onChangeText={setQuery}
            />

            {loading ? (
                <ActivityIndicator style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={(i) => i.id}
                    renderItem={({ item }) => (
                        <TaskItem
                            task={item}
                            onEdit={() => onEdit(item.id)}
                            onDelete={() => deleteItem(item.id)}
                            onToggle={() => toggleDone(item)}
                        />
                    )}
                    contentContainerStyle={{ paddingVertical: 24 }}
                    ListEmptyComponent={
                        <Text style={{ textAlign: "center", color: "#6b7280" }}>
                            Không có dữ liệu
                        </Text>
                    }
                />
            )}

            <TouchableOpacity style={styles.addButton} onPress={onPressAdd}>
                <Text style={{ color: "#fff", fontSize: 28 }}>＋</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 18,
        backgroundColor: "#fafafa",
    },
    headerRow: {
        marginTop: 8,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'row'
    },
    avatarName: {
        fontSize: 20,
        fontWeight: "700",
    },
    smallText: {
        color: "#6b7280",
    },
    search: {
        height: 44,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        marginTop: 12,
    },
    addButton: {
        position: "absolute",
        bottom: 28,
        alignSelf: "center",
        backgroundColor: "#0fc4c4",
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        elevation: 6,
    }, image: {
        width: 50,
        height: 50,
        borderRadius: 20,
    },
});