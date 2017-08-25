import { createStore, combineReducers } from "redux";
import undoable from "redux-undo";
import Graph from "./Graph.js";
import Page from "./Page.js";
import ControlsEdit from "./ControlsEdit.js";
import Algorithm from "./Algorithm.js";
import Action from "./Action.js";

const reducers = combineReducers({
    Action,
    Page,
    ControlsEdit,
    Algorithm: undoable(Algorithm, {
        undoType: 'UNDO_ALGORITHM',
        initTypes: 'ALGORITHM_INIT',
        filter: (action, currentState, previousState) => {
            if (previousState === undefined)
                return false;

            previousState.playing = false;

            return currentState.step !== previousState.step;
        }
    }),
    Graph: undoable(Graph, {
        undoType: 'UNDO_GRAPH',
        redoType: 'REDO_GRAPH',
        filter: function filterState(action, currentState, previousState) {
            if (previousState === undefined)
                return true;

            if (currentState.vertexList.length !== previousState.vertexList.length ||
                currentState.edgeList.length !== previousState.edgeList.length) {
                previousState.mouseDownVertex = false;

                document.cookie = JSON.stringify({
                    ...currentState,
                    edgeList: currentState.edgeList.map(e => {
                        return {
                            ...e,
                            to: e.to.id,
                            from: e.from.id
                        }
                    })
                })

                return true;
            }

            return false;
        }
    })
});

const store = createStore(reducers);

export default store;
