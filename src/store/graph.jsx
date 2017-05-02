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
    if(action.from != 'GRAPH')
        return state;
    
    const controlsState = store.getState().controls;

    switch (action.type) {
        case 'SELECT_VERTEX':
            unselectVertices(state);
            selectedVertex = true;
            counterOutterClicks = 0;

            return state.map(e => {
                if (e.id == action.id)
                    e.selected = true;
                return e;
            });
        case 'MOUSE_DOWN_VERTEX':
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
            selectedVertex = true;
            mouseUpId = action.id;
            counterOutterClicks = 0;
            
            if(mouseDownId != -1 && mouseUpId != mouseDownId) 
                state.map(e => {
                    if(e.id == mouseDownId) 
                        e.adjacentes = [...e.adjacentes, mouseUpId];
                    return e;
                });
            

            mouseDownId = mouseUpId = -1;

            return state;
        case 'MOUSE_BLANK':
            if (selectedVertex && counterOutterClicks < 1) {
                counterOutterClicks = 0;

                return state;
            }

            selectedVertex = false;

            mouseUpId = -1;

            return state;
        case 'ADD_VERTEX':
            if (selectedVertex && counterOutterClicks < 1) {
                counterOutterClicks++;
                return state;
            }

            unselectVertices(state);

            return [...state, {
                id: nextVertexId++,
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
