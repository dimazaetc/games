import { StyleSheet, Text, useWindowDimensions } from "react-native";

const StyledText = (props) => {
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);
  return (
    <Text
      style={{
        ...styles.bgText,
        ...props?.style,
        color: "#FEF1E0",
      }}
    >
      {props.children}
    </Text>
  );
};

export default StyledText;
const makeStyles = (fontScale) =>
  StyleSheet.create({
    bgText: {
      fontFamily: "Comfortaa-Regular",
      fontSize: 16 / fontScale,
    },
  });
