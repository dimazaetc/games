import { CREATE_GAME, UPDATE_RESULT } from "../types";

export const createGame = (game) => {
  const teams = [];
  for (let i = 0; i < game.length; i++) {
    teams.push({ id: i, name: game[i], count: 0 });
  }
  const currentGame = {
    teams,
    round: 1,
    teamId: 0,
  };
  return {
    type: CREATE_GAME,
    payload: currentGame,
  };
};

export const updateResult = (game) => {
  return {
    type: UPDATE_RESULT,
    payload: game,
  };
};
