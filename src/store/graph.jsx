import { store } from "./index.jsx"

let nextVertexId = 0;
let nextEdgeId = 0;
let selectedVertex = false;
let counterOutterClicks = 0;
let mouseDownId = -1;
let mouseUpId = -1;

function unselectVertices(state) {
    counterOutterClicks = 0;
    selectedVertex = false;

    state.map(e => {
        e.selected = false;
        return e;
    });
}

const graph = (state = [], action) => {
    if (action.from != 'GRAPH')
        return state;

    const controlsState = store.getState().controls.action;

    switch (action.type) {
        case 'DOUBLE_CLICK_VERTEX':
            if (controlsState == 'DELETE') {
                return state.filter(e => {
                    if (e.id != action.id) {
                        e.adjacentes = e.adjacentes.filter(p => {
                            if (p != action.id)
                                return p;
                        });

                        return e;
                    }
                });
            }
        case 'CLICK_VERTEX':
            unselectVertices(state);
            selectedVertex = true;
            counterOutterClicks = 0;

            return state.map(e => {
                if (e.id == action.id)
                    e.selected = true;
                return e;
            });
        case 'MOUSE_DOWN_VERTEX':
            state.mouseDownVertex = true;
            state.mouseDownId = action.id;
            selectedVertex = true;
            mouseDownId = action.id;
            counterOutterClicks = 0;

            return state;
        case 'MOUSE_MOVE':
            if (mouseDownId != -1 && controlsState == 'MOVE')
                return state.map(e => {
                    if (e.id == mouseDownId) {
                        e.x = action.x;
                        e.y = action.y;
                    }

                    return e;
                });

            return state;
        case 'MOUSE_UP_VERTEX':
            state.mouseDownVertex = false;
            selectedVertex = true;
            mouseUpId = action.id;
            counterOutterClicks = 0;

            if (mouseDownId != -1 && mouseUpId != mouseDownId)
                state.map(e => {
                    if (e.id == mouseDownId)
                        e.adjacentes = [...e.adjacentes, mouseUpId];
                    return e;
                });

            mouseDownId = mouseUpId = -1;

            return state;
        case 'MOUSE_BLANK':
            state.mouseDownVertex = false;
            mouseDownId = mouseUpId = -1;

            return state;
        case 'ADD_VERTEX':
            if (controlsState != 'ADD')
                return state;

            if (selectedVertex && counterOutterClicks < 1) {
                counterOutterClicks++;
                return state;
            } 

            unselectVertices(state);

            return [...state, {
                id: nextVertexId++,
                label: nextVertexId,
                adjacentes: [],
                x: action.x,
                y: action.y,
                selected: false
            }];
        default:
            return state;
    }
};

export { graph };
