import {
  Alert,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UA_WORDS, EN_WORDS } from "../../consts/words";
import Slider from "@react-native-community/slider";
import StyledText from "../../../../atoms/StyledText";
import { Audio } from "expo-av";
import ScreenWrapper from "../../../../atoms/ScreenWrapper";
import { ErrorHandler } from "../../../../atoms/Error";

function getWord(arr) {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
const GameScreen = ({ navigation, route }) => {
  const { team } = route.params;
  const [trueWord, setTrueWord] = useState(0.5);
  const [currentWord, setCurrentWord] = useState("");
  const [words, setWords] = useState([]);
  const [falseWords, setFalseWords] = useState([]);
  const [wordsCount, setWordsCount] = useState(0);
  const [seconds, setSeconds] = useState("");
  const [timerActive, setTimerActive] = useState(false);
  const settings = useSelector((state) => state.game.gameSettings);
  const teams = useSelector((state) => state.currentGame.currentGame);
  const [buttons, setButtons] = useState([]);
  const [sound, setSound] = useState();
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../../../assets/sound/podhodit-k-koncu.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }
  async function playSounds() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../../../assets/sound/priehali-konec.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  const getLastWord = (item) => {
    navigation.navigate("ResultScreen", {
      words,
      wordsCount,
      team,
      falseWords,
      lastWord: item,
    });
  };
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < teams.teams.length; i++) {
      const t = teams.teams[i];
      arr.push({ text: t.name, onPress: () => getLastWord(t.name) });
    }
    setButtons(arr);
  }, [teams, words, wordsCount, team, falseWords]);
  const [WORDS, setWORDS] = useState([]);
  useEffect(() => {
    if (settings.language === "UA") {
      setWORDS(UA_WORDS);
    } else {
      setWORDS(EN_WORDS);
    }
    setSeconds(settings.time);
  }, [settings]);

  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 1000, seconds - 1);
    }
    if (seconds === 10) {
      playSound();
    }
    if (seconds === 0) {
      playSounds();
    }
  }, [seconds, timerActive]);
  const [nextStep, setNextStep] = useState(0);
  useEffect(() => {
    if (nextStep === 1) {
      const word = getWord(WORDS);
      setCurrentWord(word);
      setTimerActive(!timerActive);
      setNextStep(0);
    }
  }, [nextStep]);
  useEffect(() => {
    if (trueWord === 1 && seconds !== 0) {
      setWords([...words, currentWord]);
      setWordsCount(wordsCount + 1);
      const word = getWord(WORDS);
      setCurrentWord(word);
      setTrueWord(0.5);
    } else if (trueWord === 0) {
      setFalseWords([...falseWords, currentWord]);
      setWordsCount(wordsCount - 1);
      const word = getWord(WORDS);
      setCurrentWord(word);
      setTrueWord(0.5);
    } else if (seconds === 0 && trueWord === 1) {
      Alert.alert("Останне слово", "Виберіть команду", buttons);
    }
  }, [trueWord]);

  return (
    <ErrorHandler title={"Game Screen Alias"}>
      <ScreenWrapper navigation={navigation}>
        <View style={styles.image}>
          <View style={styles.settingsBlock}>
            <View
              style={{
                backgroundColor: "#895B3B",
                borderRadius: 20,
                padding: 15,
                width: "100%",
              }}
            >
              <StyledText>Команда: {team}</StyledText>
              <StyledText style={{ marginTop: 10 }}>
                Кількість слів: {wordsCount}
              </StyledText>
            </View>
          </View>
          <>
            {!timerActive && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <StyledText>Почати</StyledText>
                </View>
                <Slider
                  style={{ width: 100, height: 40 }}
                  minimumValue={0}
                  maximumValue={1}
                  value={nextStep}
                  thumbTintColor={"green"}
                  maximumTrackTintColor="#FEF1E0"
                  minimumTrackTintColor="#628469"
                  step={1}
                  onSlidingComplete={(value) => {
                    setNextStep(value);
                  }}
                />
              </View>
            )}
            {timerActive && (
              <View>
                <View style={styles.languageWrapper}>
                  <StyledText style={{ fontSize: 22 }}>-</StyledText>
                  <StyledText style={{ fontSize: 22 }}>
                    {currentWord.toUpperCase()}
                  </StyledText>
                  <StyledText style={{ fontSize: 22 }}>+</StyledText>
                </View>
                <Slider
                  style={{ width: "100%", height: 80 }}
                  minimumValue={0}
                  maximumValue={1}
                  value={trueWord}
                  minimumTrackTintColor="red"
                  maximumTrackTintColor="green"
                  step={0.5}
                  onSlidingComplete={(value) => {
                    setTrueWord(value);
                  }}
                />
              </View>
            )}
          </>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              title={"Пауза"}
              color="#FEF1E0"
              onPress={() => setTimerActive(!timerActive)}
            />
            <StyledText>{seconds}</StyledText>
          </View>
        </View>
      </ScreenWrapper>
    </ErrorHandler>
  );
};

export default GameScreen;
const styles = StyleSheet.create({
  topSide: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  languageWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  settingsBlock: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FEF1E0",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    flex: 1,
    justifyContent: "space-around",
    padding: 15,
  },
});
