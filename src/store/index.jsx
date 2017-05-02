import { createStore, combineReducers } from "redux";

import { graph } from "./graph.jsx";
import { controls } from "./controls.jsx";

const reducers = combineReducers({controls, graph});

const store = createStore(reducers);

export { store };
