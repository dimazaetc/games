import { GET_GAME_SETTINGS } from "../types";

const initialState = {
  gameSettings: {
    language: "",
    person: 0,
    time: 0,
    count: 0,
  },
};

export const gameReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_GAME_SETTINGS:
      return {
        ...state,
        gameSettings: payload,
      };

    default:
      return state;
  }
};
