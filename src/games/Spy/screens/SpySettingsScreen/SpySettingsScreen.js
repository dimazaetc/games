import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useDispatch } from "react-redux";
import { getGameSettings } from "../../../../redux/actions/game";
import StyledText from "../../../../atoms/StyledText";
import ScreenWrapper from "../../../../atoms/ScreenWrapper";

const SpySettingsScreen = ({ navigation }) => {
  const [personValue, setPersonValue] = useState(3);
  const [timeValue, setTimeValue] = useState(1);
  const [countValue, setCountValue] = useState(1);
  const [nextStep, setNextStep] = useState(0);
  useEffect(() => {
    if (nextStep === 1) {
      startGame();
      setNextStep(0);
    }
  }, [nextStep]);
  const dispatch = useDispatch();

  const startGame = () => {
    navigation.navigate("SpyGameScreen", {
      person: personValue,
      time: timeValue,
      spy: countValue,
    });
  };
  return (
    <ScreenWrapper navigation={navigation}>
      <View style={styles.settingsBlock}>
        <View
          style={{
            backgroundColor: "#895B3B",
            borderRadius: 20,
            padding: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.rangeWrapper}>
            <StyledText style={{ marginBottom: 20 }}>
              Кількість ігроків: {personValue}
            </StyledText>

            <View style={styles.languageWrapper}>
              <StyledText>3</StyledText>
              <StyledText>4</StyledText>
              <StyledText>5</StyledText>
              <StyledText>6</StyledText>
              <StyledText>7</StyledText>
              <StyledText>8</StyledText>
              <StyledText>9</StyledText>
              <StyledText>10</StyledText>
            </View>
            <Slider
              style={{ width: 300, height: 40 }}
              thumbImage={require("../../../../../assets/person.png")}
              minimumValue={3}
              maximumValue={10}
              step={1}
              maximumTrackTintColor="#FEF1E0"
              minimumTrackTintColor="#628469"
              onSlidingComplete={(value) => {
                setPersonValue(value);
              }}
            />
          </View>
          <View style={styles.rangeWrapper}>
            <StyledText style={{ marginBottom: 20 }}>
              Час: {timeValue} х
            </StyledText>

            <View style={styles.languageWrapper}>
              <StyledText>1x</StyledText>
              <StyledText>2x</StyledText>
              <StyledText>3x</StyledText>
              <StyledText>4x</StyledText>
              <StyledText>5x</StyledText>
            </View>
            <Slider
              style={{ width: 300, height: 40 }}
              minimumValue={1}
              maximumValue={5}
              thumbImage={require("../../../../../assets/clock.png")}
              step={0.5}
              maximumTrackTintColor="#FEF1E0"
              minimumTrackTintColor="#628469"
              onSlidingComplete={(value) => {
                setTimeValue(value);
              }}
            />
          </View>

          <View style={styles.rangeWrapper}>
            <StyledText style={{ marginBottom: 20 }}>
              Кількість шпигунів: {countValue}
            </StyledText>
            <View style={styles.languageWrapper}>
              <StyledText>1</StyledText>
              <StyledText>2</StyledText>
              <StyledText>3</StyledText>
              <StyledText>4</StyledText>
              <StyledText>5</StyledText>
            </View>
            <Slider
              style={{ width: 300, height: 40 }}
              minimumValue={1}
              maximumValue={5}
              thumbImage={require("../../../../../assets/count.png")}
              step={1}
              maximumTrackTintColor="#FEF1E0"
              minimumTrackTintColor="#628469"
              onSlidingComplete={(value) => {
                setCountValue(value);
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View>
              <StyledText>Почати</StyledText>
            </View>
            <Slider
              style={{ width: 100, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              thumbTintColor={"#442421"}
              maximumTrackTintColor="#FEF1E0"
              minimumTrackTintColor="#628469"
              value={nextStep}
              step={1}
              onSlidingComplete={(value) => {
                setNextStep(value);
              }}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SpySettingsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsBlock: {
    backgroundColor: "#f2d8c8",
    padding: 20,
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
});
