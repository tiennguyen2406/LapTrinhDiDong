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

type Screen01NavigationProp = StackNavigationProp<RootStackParamList, "Screen01">;
type Props = {
  navigation: Screen01NavigationProp;
};

const productImage: any = require("../../assets/images/vs_blue.png");

export default function Screen01({ navigation }: Props) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#efefef" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.imageWrap}>
            <Image source={productImage} style={styles.image} resizeMode="contain" />
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>Điện thoại Vsmart Joy 3 - Hàng chính hãng</Text>

            <View style={styles.ratingRow}>
              <Text style={styles.stars}>★★★★★</Text>
              <Text style={styles.ratingCount}>(Xem 828 đánh giá)</Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.price}>1.790.000 đ</Text>
              <Text style={styles.oldPrice}>1.790.000 đ</Text>
            </View>

            <TouchableOpacity
              style={styles.colorButton}
              onPress={() => navigation.navigate("Screen02", { selectedColor })}
            >
              <Text style={styles.colorButtonText}>4 MÀU - CHỌN MÀU</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => navigation.navigate("Screen04", { selectedColor })}
            >
              <Text style={styles.buyButtonText}>CHỌN MUA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 10,
    borderWidth: 3,
    borderColor: "#1e90ff",
    overflow: "hidden",
  },
  imageWrap: { alignItems: "center", marginBottom: 8 },
  image: { width: 220, height: 300 },
  info: { paddingHorizontal: 6 },
  title: { fontSize: 14, marginBottom: 6 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  stars: { color: "#f2c94c", marginRight: 8 },
  ratingCount: { color: "#777", fontSize: 12 },
  priceRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  price: { fontSize: 18, fontWeight: "700", color: "#000", marginRight: 10 },
  oldPrice: { fontSize: 12, color: "#999", textDecorationLine: "line-through" },
  colorButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 10,
  },
  colorButtonText: { color: "#333", fontWeight: "600" },
  buyButton: { backgroundColor: "#d80000", paddingVertical: 12, borderRadius: 6, alignItems: "center" },
  buyButtonText: { color: "#fff", fontWeight: "700" },
});