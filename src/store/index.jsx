import { createStore, combineReducers } from "redux";
import undoable from "redux-undo";
import { graph } from "./graph.jsx";
import { controls } from "./controls.jsx";

const reducers = combineReducers({
    controls,
    graph: undoable(graph, {
        filter: function filterState(action, currentState, previousState) {
            if (previousState == undefined)
                return true;

            if (currentState.vertexList.length != previousState.vertexList.length ||
                currentState.edgeList.length != previousState.edgeList.length) {
                previousState.mouseDownVertex = false;

                return true;
            }

            return false;
        }
    })
});

const store = createStore(reducers);

export { store };
