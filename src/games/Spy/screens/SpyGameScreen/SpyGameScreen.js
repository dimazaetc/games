import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import StyledText from "../../../../atoms/StyledText";
import { PLACES } from "../../consts/places";
import ScreenWrapper from "../../../../atoms/ScreenWrapper";

const SpyGameScreen = ({ navigation, route }) => {
  const { person, time, spy } = route.params;
  const [place, setPlace] = useState("");
  useEffect(() => {
    setPlace(arrayRandElement(PLACES));
  }, []);
  function arrayRandElement(arr) {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  }

  const [persons, setPerson] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [currentCard, setCurrentCard] = useState("");
  const [order, setOrder] = useState(-1);
  const [seconds, setSeconds] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  useEffect(() => {
    const p = [];
    for (let i = 0; i < person - spy; i++) {
      p.push(place);
    }
    for (let i = 0; i < spy; i++) {
      p.push("Шпигун");
    }
    p.sort(() => Math.random() - 0.5);

    setPerson(p);
    setSeconds(time * 60);
  }, [person, place]);

  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 1000, seconds - 1);
    } else if (seconds === 0) {
    }
  }, [seconds, timerActive]);
  useEffect(() => {
    setCurrentCard(persons[order]);

    if (!showCard) {
      setOrder(order + 1);
    }
  }, [showCard]);
  useEffect(() => {
    setCurrentCard(persons[order]);
    if (order === persons.length) {
      setTimerActive(true);
    }
  }, [order]);
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
          {!(order === persons?.length) && (
            <TouchableOpacity onPress={() => setShowCard(!showCard)}>
              {showCard ? (
                <View style={{ alignItems: "center" }}>
                  {currentCard === "Шпигун" ? (
                    <Image source={require("../../spy.png")} />
                  ) : (
                    <Image source={require("../../ep_place.png")} />
                  )}
                  <StyledText style={{ marginTop: 20 }}>
                    {currentCard}
                  </StyledText>
                </View>
              ) : (
                <TouchableOpacity onPress={() => setShowCard(!showCard)}>
                  <View
                    style={{
                      width: 225,
                      height: 225,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <StyledText>Тисніть щоб побпчити картку</StyledText>
                  </View>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          )}
          {seconds === 0 ? (
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <StyledText>Ще разок</StyledText>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {order === persons?.length && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <StyledText
                    style={{
                      fontSize: 40,
                      fontFamily: "Comfortaa-Bold",
                      fontWeight: "bold",
                    }}
                  >
                    {seconds}
                  </StyledText>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SpyGameScreen;
const styles = StyleSheet.create({
  settingsBlock: {
    backgroundColor: "#f2d8c8",
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
  },
});
