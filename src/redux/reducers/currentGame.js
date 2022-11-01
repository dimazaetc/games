import { CREATE_GAME, UPDATE_RESULT } from "../types";

const initialState = {
  currentGame: [],
};

export const currentGameReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_GAME:
      return {
        ...state,
        currentGame: payload,
      };
    case UPDATE_RESULT:
      return {
        ...state,
        currentGame: payload,
      };

    default:
      return state;
  }
};
