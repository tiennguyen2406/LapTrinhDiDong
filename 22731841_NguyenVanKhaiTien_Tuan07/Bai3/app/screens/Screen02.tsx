import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { RouteProp } from "@react-navigation/native";

type Screen02NavigationProp = StackNavigationProp<RootStackParamList, "Screen02">;
type Screen02RouteProp = RouteProp<RootStackParamList, "Screen02">;

type Props = {
  navigation: Screen02NavigationProp;
  route: Screen02RouteProp;
};

const thumbImage: any = require("../../assets/images/vs_black.png");

const COLORS = [
  { key: "light", color: "#C8F0F8", image: require("../../assets/images/vs_silver.png") },
  { key: "red", color: "#d80000", image: require("../../assets/images/vs_red.png") },
  { key: "black", color: "#000", image: require("../../assets/images/vs_black.png") },
  { key: "blue", color: "#1e3a8a", image: require("../../assets/images/vs_blue.png") },
];

export default function Screen02({ navigation, route }: Props) {
  const [selected, setSelected] = useState<string | undefined>(route.params?.selectedColor);

  const onDone = () => {
    navigation.navigate("Screen03", { selectedColor: selected });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#efefef" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.thumbRow}>
          <Image source={thumbImage} style={styles.thumb} resizeMode="contain" />
          <View style={styles.thumbInfo}>
            <Text style={styles.title}>Điện Thoại Vsmart Joy 3</Text>
            <Text style={styles.subtitle}>Hàng chính hãng</Text>
          </View>
        </View>

        <Text style={styles.label}>Chọn một màu bên dưới:</Text>

        <View style={styles.colors}>
          {COLORS.map((c) => {
            const isSel = selected === c.key;
            return (
              <TouchableOpacity
                key={c.key}
                style={[
                  styles.colorBox,
                  { backgroundColor: c.color },
                  isSel ? styles.colorBoxSelected : null,
                ]}
                onPress={() => setSelected(c.key)}
              />
            );
          })}
        </View>

        <TouchableOpacity style={styles.doneButton} onPress={onDone}>
          <Text style={styles.doneText}>XONG</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, alignItems: "center" },
  thumbRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
    alignItems: "center",
  },
  thumb: { width: 80, height: 100 },
  thumbInfo: { marginLeft: 10 },
  title: { fontWeight: "700" },
  subtitle: { color: "#666", fontSize: 12 },
  label: { alignSelf: "flex-start", marginTop: 8, marginBottom: 8 },
  colors: { width: "100%", alignItems: "center" },
  colorBox: {
    width: 90,
    height: 60,
    marginBottom: 14,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  colorBoxSelected: { borderWidth: 3, borderColor: "#555" },
  doneButton: {
    marginTop: 18,
    backgroundColor: "#4b69ff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  doneText: { color: "#fff", fontWeight: "700" },
});