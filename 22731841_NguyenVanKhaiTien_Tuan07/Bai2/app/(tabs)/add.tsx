import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const API_BASE = "https://68e726ac10e3f82fbf3e26b0.mockapi.io/product";

export default function AddScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id as string | undefined;
  const name = (params.name as string) || "Twinkle";

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        try {
          const res = await fetch(`${API_BASE}/${id}`);
          if (!res.ok) throw new Error("Fetch item failed");
          const data = await res.json();
          const label = data?.name || data?.title || data?.productName || "";
          setValue(label);
          const img = data?.image || data?.avatar || data?.photo || null;
          setImageUrl(img);
        } catch (e) {
          console.warn(e);
          Alert.alert("Lỗi", "Lấy dữ liệu item thất bại");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  const onFinish = async () => {
    if (!value.trim()) {
      Alert.alert("Chú ý", "Vui lòng nhập nội dung");
      return;
    }
    setLoading(true);
    try {
      const body = { name: value, title: value, image: imageUrl };
      let res;
      if (id) {
        res = await fetch(`${API_BASE}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...body, done: false }),
        });
      }
      if (!res.ok) {
        const text = await res.text();
        console.warn("Save failed", res.status, text);
        Alert.alert("Lỗi", "Lưu không thành công");
        return;
      }
      // go back to tasks screen — useFocusEffect in Tasks will refetch
      router.back();
    } catch (e) {
      console.warn("Save failed", e);
      Alert.alert("Lỗi", "Lưu không thành công (mạng)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <View style={styles.headerRow}>
        <Text style={styles.avatarName}>Hi {name}</Text>
        <Text style={styles.smallText}>Have a grate day a head</Text>
      </View>

      <Text style={styles.title}>{id ? "EDIT YOUR JOB" : "ADD YOUR JOB"}</Text>

      <View style={{ width: "100%", marginTop: 12 }}>
        <TextInput
          placeholder="input your job"
          value={value}
          onChangeText={setValue}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onFinish} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>FINISH ➜</Text>}
      </TouchableOpacity>

      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={{ width: 140, height: 140, marginTop: 36 }} />
      ) : (
        <Image
          source={{
            uri: "https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Actions-document-edit-icon.png",
          }}
          style={{ width: 140, height: 140, marginTop: 36, opacity: 0.9 }}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  headerRow: {
    alignSelf: "flex-start",
    marginTop: 8,
  },
  avatarName: {
    fontSize: 18,
    fontWeight: "700",
  },
  smallText: {
    color: "#6b7280",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 14,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 18,
    backgroundColor: "#12b8bd",
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});