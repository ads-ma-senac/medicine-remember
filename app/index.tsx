import { DefaultTheme, PaperProvider } from "react-native-paper";

import { App } from "./app";
import React from "react";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function Index() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}
