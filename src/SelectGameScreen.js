import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import StyledText from "./atoms/StyledText";

const SelectGameScreen = ({ navigation }) => {
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/BG.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            flex: 1,
          }}
        >
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Виберіть гру</Text>
          </View>
          <View style={styles.settingsBlock}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "40%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => navigation.navigate("SettingsScreen")}
              >
                <Image
                  style={{ width: 100, height: 100, marginBottom: 20 }}
                  source={require("./alias.png")}
                />
                <StyledText>Аліас</StyledText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "40%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => navigation.navigate("SpySettingsScreen")}
              >
                <Image
                  style={{ width: 100, height: 100, marginBottom: 20 }}
                  source={require("./spy.png")}
                />
                <StyledText>Шпигун</StyledText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SelectGameScreen;
const makeStyles = (fontScale) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
    },
    settingsBlock: {
      backgroundColor: "#628469",
      padding: 20,
      margin: 20,
      borderRadius: 20,
      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    languageWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    rangeWrapper: {
      marginVertical: 10,
    },
    title: {
      fontSize: 40 / fontScale,
      fontFamily: "Comfortaa-Bold",
      fontWeight: "bold",
      textAlign: "center",
      color: "#FEF1E0",
    },
    titleWrapper: {
      backgroundColor: "#628469",
      borderRadius: 150,
      height: 250,
      width: 250,
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
    },
  });
