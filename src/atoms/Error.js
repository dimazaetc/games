import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { View, StyleSheet, Button, Text } from "react-native";
import { useState } from "react";

export const ErrorHandler = ({ ...props }) => {
  const [er, setEr] = useState("");
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => (
        <View style={[styles.container]}>
          <View>
            <Text>
              Something went wrong: {props.title} - {er.message}
            </Text>
            <Button title="try Again" onPress={resetErrorBoundary} />
          </View>
        </View>
      )}
      onError={(error) => setEr(error)}
    >
      {props.children}
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 12,
  },
});
