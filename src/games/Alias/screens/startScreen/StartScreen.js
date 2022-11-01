import { ImageBackground, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { EN_NAMES, UA_NAMES } from "../../consts/TeamNames";
import { useEffect, useState } from "react";
import { createGame } from "../../../../redux/actions/currentGame";
import Slider from "@react-native-community/slider";
import StyledText from "../../../../atoms/StyledText";
import ScreenWrapper from "../../../../atoms/ScreenWrapper";

const Item = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5,
      }}
    >
      <StyledText>{item.name}</StyledText>
      <StyledText>{item.count}</StyledText>
    </View>
  );
};

const StartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.game.gameSettings);
  const teams = useSelector((state) => state.currentGame.currentGame);
  const [winner, setWinners] = useState(null);
  useEffect(() => {
    if (teams.teamId === 0) {
      const winners = teams.teams.filter(
        (item) => item.count >= settings.count
      );
      if (winners.length > 1) {
        setWinners(
          winners.sort(function (a, b) {
            return b.count - a.count;
          })[0]
        );
      } else {
        if (winners.length) {
          setWinners(winners);
        }
      }
    }
  }, [teams]);
  function randomArray(arr, len) {
    arr.sort(function () {
      return Math.random() > 0.5;
    });
    arr.length = len;

    return arr;
  }
  useEffect(() => {
    if (settings.language === "UA") {
      const arr = randomArray(UA_NAMES, settings.person);
      dispatch(createGame(arr));
    } else {
      const arr = randomArray(EN_NAMES, settings.person);
      dispatch(createGame(arr));
    }
  }, [settings]);
  const getTeam = () => {
    const team = teams?.teams?.find((item) => item.id === teams.teamId);
    return team?.name;
  };
  const [nextStep, setNextStep] = useState(0);
  useEffect(() => {
    if (nextStep === 1) {
      navigation.navigate("GameScreen", { team: getTeam() });
      setNextStep(0);
    }
  }, [nextStep]);
  return (
    <>
      {winner ? (
        <ScreenWrapper navigation={navigation}>
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <StyledText>Вітаю {winner[0].name}</StyledText>
          </View>
        </ScreenWrapper>
      ) : (
        <ScreenWrapper navigation={navigation}>
          <View style={styles.image}>
            <View style={styles.settingsBlock}>
              <View
                style={{
                  backgroundColor: "#895B3B",
                  borderRadius: 20,
                  padding: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <StyledText>Команди</StyledText>
                  <StyledText>{settings.count}</StyledText>
                </View>
                <View style={{ marginTop: 20, width: "100%" }}>
                  {teams?.teams?.map((item) => (
                    <Item key={item.id} item={item} />
                  ))}
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledText>
                Раунд: {teams.round} / Команда: {getTeam()}
              </StyledText>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
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
                thumbTintColor={"#442421"}
                maximumTrackTintColor="#FEF1E0"
                minimumTrackTintColor="#628469"
                step={1}
                onSlidingComplete={(value) => {
                  setNextStep(value);
                }}
              />
            </View>
          </View>
        </ScreenWrapper>
      )}
    </>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  settingsBlock: {
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
