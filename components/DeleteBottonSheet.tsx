import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { ReactNode, Ref } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { images } from "@/constants/images";
import { Image } from "expo-image";

interface DeleteBottonSheetProps {
  ref: Ref<BottomSheet>;
  children: ReactNode;
}

export default function DeleteBottonSheet({ ref,children }: DeleteBottonSheetProps) {
  const theme = useTheme();
  const snapPoints = ['25%', '50%', '90%'];

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      style={styles.container}
      backgroundStyle={{ backgroundColor: theme.colors.background }}
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
       {children}
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
    paddingTop: 16,
    paddingBottom: 32,
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
});
