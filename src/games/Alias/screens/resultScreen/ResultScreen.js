import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateResult } from "../../../../redux/actions/currentGame";
import StyledText from "../../../../atoms/StyledText";
import Slider from "@react-native-community/slider";
import { useEffect, useState } from "react";

const ResultScreen = ({ route, navigation }) => {
  const game = useSelector((state) => state.currentGame.currentGame);
  const { words, wordsCount, team, falseWords, lastWord } = route.params;
  const dispatch = useDispatch();
  const NextStep = () => {
    const updatedTeams = game.teams.map((item) => {
      if (item.name === team && item.name === lastWord) {
        return { ...item, count: item.count + wordsCount + 1 };
      } else if (item.name === team) {
        return { ...item, count: item.count + wordsCount };
      } else if (item.name === lastWord) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    if (game.teams.length - 1 === game.teamId) {
      const item = {
        round: game.round + 1,
        teamId: 0,
        teams: updatedTeams,
      };
      dispatch(updateResult(item));
    } else {
      const item = {
        round: 1,
        teamId: game.teamId + 1,
        teams: updatedTeams,
      };
      dispatch(updateResult(item));
    }

    navigation.navigate("StartScreen");
  };
  const [nextStep, setNextStep] = useState(0);
  useEffect(() => {
    if (nextStep === 1) {
      NextStep();
      setNextStep(0);
    }
  }, [nextStep]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../../assets/GreenBG.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <StyledText
          style={{ fontSize: 32, marginBottom: 10, textAlign: "center" }}
        >
          {wordsCount}
        </StyledText>
        <ScrollView>
          <View>
            <View>
              <StyledText style={{ fontSize: 20, marginBottom: 10 }}>
                Кількість відгаданих слів: {words?.length}
              </StyledText>
              <View>
                {words.map((item, index) => (
                  <View key={index}>
                    <StyledText>{item}</StyledText>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <StyledText style={{ fontSize: 20, marginBottom: 10 }}>
                Кількість не відгаданих слів: {falseWords.length}
              </StyledText>
              <View>
                {falseWords.map((item, index) => (
                  <View key={index}>
                    <StyledText>{item}</StyledText>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            // justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View>
            <StyledText>Продовжити</StyledText>
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
      </ImageBackground>
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSide: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 200,
    paddingVertical: 50,
  },
});
