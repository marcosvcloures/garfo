import { createStore, combineReducers } from "redux";

import { graph } from "./graph.jsx";

const reducers = combineReducers({graph});

const store = createStore(reducers);

export { store };
