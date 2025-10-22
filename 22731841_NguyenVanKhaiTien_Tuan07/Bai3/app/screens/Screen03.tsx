import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { RouteProp } from "@react-navigation/native";

type Screen03NavigationProp = StackNavigationProp<RootStackParamList, "Screen03">;
type Screen03RouteProp = RouteProp<RootStackParamList, "Screen03">;

type Props = {
  navigation: Screen03NavigationProp;
  route: Screen03RouteProp;
};

const productThumb: any = require("../../assets/images/vs_black.png");

export default function Screen03({ navigation, route }: Props) {
  const colorKey = route.params?.selectedColor;
  const colorMap: Record<string, any> = {
    light: require("../../assets/images/vs_silver.png"),
    red: require("../../assets/images/vs_red.png"),
    black: require("../../assets/images/vs_black.png"),
    blue: require("../../assets/images/vs_blue.png"),
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#efefef" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Image source={productThumb} style={styles.image} resizeMode="contain" />
          <View style={styles.cardBody}>
            <Text style={styles.title}>Điện Thoại Vsmart Joy 3</Text>
            <Text style={styles.sub}>Hàng chính hãng</Text>

            <View style={styles.row}>
              <Text>Màu: </Text>
              <View
                style={[
                  styles.colorPreview,
                  {
                    backgroundColor:
                      colorKey === "light"
                        ? "#C8F0F8"
                        : colorKey === "red"
                        ? "#d80000"
                        : colorKey === "black"
                        ? "#000"
                        : colorKey === "blue"
                        ? "#1e3a8a"
                        : "#eee",
                  },
                ]}
              />
            </View>

            <Text style={styles.price}>1.790.000 đ</Text>
            <Text style={styles.provider}>Cung cấp bởi Tiki Tradding</Text>
          </View>
        </View>

        <Text style={styles.chooseLabel}>Chọn một màu bên dưới:</Text>

        <View style={styles.colors}>
          {Object.keys(colorMap).map((k) => (
            <Image key={k} source={colorMap[k]} style={styles.colorBox} resizeMode="cover" />
          ))}
        </View>

        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate("Screen04", { selectedColor: colorKey })}
        >
          <Text style={styles.doneText}>XONG</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, alignItems: "center" },
  card: { width: "100%", backgroundColor: "#fff", borderRadius: 6, padding: 10, marginBottom: 12, flexDirection: "row" },
  image: { width: 90, height: 120 },
  cardBody: { marginLeft: 10, flex: 1 },
  title: { fontWeight: "700" },
  sub: { color: "#666", fontSize: 12 },
  row: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  colorPreview: { width: 24, height: 24, marginLeft: 6, borderRadius: 4, borderWidth: 1, borderColor: "#ddd" },
  price: { marginTop: 8, fontSize: 16, fontWeight: "700" },
  provider: { fontSize: 12, color: "#777" },
  chooseLabel: { alignSelf: "flex-start", marginTop: 10, marginBottom: 10 },
  colors: { width: "100%", alignItems: "center" },
  colorBox: { width: 90, height: 60, marginBottom: 12, borderRadius: 4, borderWidth: 1, borderColor: "#ddd" },
  doneButton: { marginTop: 18, backgroundColor: "#4b69ff", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10, width: "90%", alignItems: "center" },
  doneText: { color: "#fff", fontWeight: "700" },
});