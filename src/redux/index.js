import { combineReducers } from "redux";

import { legacy_createStore as createStore } from "redux";
import { gameReducer } from "./reducers/game";
import { currentGameReducer } from "./reducers/currentGame";

const rootReducer = combineReducers({
  game: gameReducer,
  currentGame: currentGameReducer,
});
export default createStore(rootReducer);
