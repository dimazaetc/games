import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import SettingsScreen from "./src/games/Alias/screens/settingsScreen/SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "./src/games/Alias/screens/startScreen/StartScreen";
import { Provider } from "react-redux";

import store from "./src/redux";
import { useFonts } from "expo-font";
import SelectGameScreen from "./src/SelectGameScreen";
import SpySettingsScreen from "./src/games/Spy/screens/SpySettingsScreen/SpySettingsScreen";
import SpyGameScreen from "./src/games/Spy/screens/SpyGameScreen/SpyGameScreen";
import GameScreen from "./src/games/Alias/screens/gameScreen/GameScreen";
import ResultScreen from "./src/games/Alias/screens/resultScreen/ResultScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Comfortaa-Bold": require("./assets/fonts/Comfortaa-Bold.ttf"),
    "Comfortaa-Regular": require("./assets/fonts/Comfortaa-Regular.ttf"),
  });
  const navTheme = DefaultTheme;
  navTheme.colors.background = "#e9f0fb";

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer theme={navTheme}>
      <Provider store={store}>
        <Stack.Navigator
          tabBar={() => null}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SelectGameScreen" component={SelectGameScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen
            name="SpySettingsScreen"
            component={SpySettingsScreen}
          />

          <Stack.Screen name="SpyGameScreen" component={SpyGameScreen} />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="GameScreen" component={GameScreen} />
          <Stack.Screen name="ResultScreen" component={ResultScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
