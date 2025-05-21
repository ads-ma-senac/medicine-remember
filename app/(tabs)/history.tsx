import { DefaultScreen } from "@/components/DefaultScreen";
import { Text } from "react-native-paper";
import { View } from "react-native";

export default function History() {
  return (
    <DefaultScreen>
      <View
        style={{
          flex: 1,
          margin: 16,
        }}
      >
        <Text>History</Text>
      </View>
    </DefaultScreen>
  );
}
