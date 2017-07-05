import { createStore, combineReducers } from "redux";
import undoable from "redux-undo";
import Graph from "./Graph.js";
import Page from "./Page.js";
import ControlsEdit from "./ControlsEdit.js";
import Algorithm from "./Algorithm.js";

const reducers = combineReducers({
    Page,
    ControlsEdit,
    Algorithm: undoable(Algorithm, {
        filter: function filterState(action, currentState, previousState) {
            if (previousState === undefined)
                return false; 

            if (currentState.vertexList.length !== previousState.vertexList.length ||
                currentState.edgeList.length !== previousState.edgeList.length) 
                return true;
            
            return false;
        }
    }),
    Graph: undoable(Graph, {
        filter: function filterState(action, currentState, previousState) {
            if (previousState === undefined)
                return true;

            if (currentState.vertexList.length !== previousState.vertexList.length ||
                currentState.edgeList.length !== previousState.edgeList.length) {
                previousState.mouseDownVertex = false;

                return true;
            }

            return false;
        }
    })
});

const store = createStore(reducers);

export default store;
