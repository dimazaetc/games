import { GET_GAME_SETTINGS } from "../types";

export const getGameSettings = (settings) => {
  return {
    type: GET_GAME_SETTINGS,
    payload: settings,
  };
};
