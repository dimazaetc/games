import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useDispatch } from "react-redux";
import { getGameSettings } from "../../../../redux/actions/game";
import StyledText from "../../../../atoms/StyledText";
import ScreenWrapper from "../../../../atoms/ScreenWrapper";

const SettingsScreen = ({ navigation }) => {
  const [languageValue, setLanguageValue] = useState(1);
  const [personValue, setPersonValue] = useState(2);
  const [timeValue, setTimeValue] = useState(30);
  const [countValue, setCountValue] = useState(30);
  const [nextStep, setNextStep] = useState(0);
  useEffect(() => {
    if (nextStep === 1) {
      startGame();
      setNextStep(0);
    }
  }, [nextStep]);
  const dispatch = useDispatch();

  const startGame = () => {
    dispatch(
      getGameSettings({
        language: languageValue > 5 ? "EN" : "UA",
        person: personValue,
        time: timeValue,
        count: countValue,
      })
    );
    navigation.navigate("StartScreen");
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
              Мова: {languageValue > 5 ? "EN" : "UA"}
            </StyledText>

            <View style={styles.languageWrapper}>
              <StyledText>UA</StyledText>
              <StyledText>EN</StyledText>
            </View>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={0}
              maximumValue={10}
              thumbImage={require("../../../../../assets/language.png")}
              step={0.5}
              maximumTrackTintColor="#FEF1E0"
              minimumTrackTintColor="#628469"
              onSlidingComplete={(value) => {
                setLanguageValue(value);
              }}
            />
          </View>
          <View style={styles.rangeWrapper}>
            <StyledText style={{ marginBottom: 20 }}>
              Кількість команд: {personValue}
            </StyledText>

            <View style={styles.languageWrapper}>
              <StyledText>2</StyledText>
              <StyledText>3</StyledText>
              <StyledText>4</StyledText>
              <StyledText>5</StyledText>
              <StyledText>6</StyledText>
            </View>
            <Slider
              style={{ width: "100%", height: 40 }}
              thumbImage={require("../../../../../assets/person.png")}
              minimumValue={2}
              maximumValue={6}
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
              Час: {timeValue}
            </StyledText>

            <View style={styles.languageWrapper}>
              <StyledText>30с</StyledText>
              <StyledText>45с</StyledText>
              <StyledText>60с</StyledText>
              <StyledText>75с</StyledText>
              <StyledText>90с</StyledText>
            </View>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={30}
              maximumValue={90}
              thumbImage={require("../../../../../assets/clock.png")}
              step={15}
              maximumTrackTintColor="#FEF1E0"
              minimumTrackTintColor="#628469"
              onSlidingComplete={(value) => {
                setTimeValue(value);
              }}
            />
          </View>

          <View style={styles.rangeWrapper}>
            <StyledText style={{ marginBottom: 20 }}>
              Кількість слів: {countValue}
            </StyledText>
            <View style={styles.languageWrapper}>
              <StyledText>30</StyledText>
              <StyledText>60</StyledText>
              <StyledText>100</StyledText>
            </View>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={30}
              maximumValue={100}
              thumbImage={require("../../../../../assets/count.png")}
              step={5}
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
              value={nextStep}
              step={1}
              maximumTrackTintColor="#FEF1E0"
              minimumTrackTintColor="#628469"
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

export default SettingsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsBlock: {
    width: "100%",
    backgroundColor: "#FEF1E0",
    padding: 15,
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
    width: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});
