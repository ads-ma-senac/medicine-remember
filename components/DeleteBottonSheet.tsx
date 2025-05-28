import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { Ref } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { images } from "@/constants/images";
import { Image } from "expo-image";

interface DeleteBottonSheetProps {
  ref: Ref<BottomSheet>;
}

export default function DeleteBottonSheet({ ref }: DeleteBottonSheetProps) {
  const theme = useTheme();
  const snapPoints = ['25%', '50%', '90%'];
  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      style={{ flex: 1 }}
      backgroundStyle={{ backgroundColor: "red" }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={{ alignItems: "center" }}>
          <Image source={images.trash} style={{ width: 120, height: 120 }} />
          <Text style={[styles.textTitle]}>Tchau, lembrete?</Text>
          <Text style={[styles.textSubtitle]}>
            Só confirme e ele desaparece!
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            width: "100%",
            gap: 16,
            paddingRight: 24,
            paddingLeft: 24,
          }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: theme.colors.errorContainer },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: theme.colors.error,
                },
              ]}
            >
              Deletar lembrete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: theme.colors.outlineVariant },
            ]}
          >
            <Text style={[styles.buttonText]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 40,
    alignItems: "center",
    gap: 24,
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  textSubtitle: {
    fontWeight: "600",
    fontSize: 18,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 16,
    width: "100%",
    height: Platform.OS === "ios" ? 54 : 62,
    gap: 8,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
  },
});
