import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import StyledText from "./StyledText";
import { ErrorHandler } from "./Error";

const ScreenWrapper = ({ children, navigation: { goBack } }) => {
  return (
    <ErrorHandler title={"background"}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/GreenBG.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 50,
              left: 50,
              backgroundColor: "#895B3B",
              padding: 5,
              borderRadius: 10,
              zIndex: 12,
            }}
            onPress={() => goBack()}
          >
            <StyledText style={{ fontSize: 14 }}>Назад</StyledText>
          </TouchableOpacity>
          {children}
        </ImageBackground>
      </View>
    </ErrorHandler>
  );
};

export default ScreenWrapper;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});
