import { store } from "./index.jsx"

let nextVertexId = 0;
let nextEdgeId = 0;
let mouseUpId = -1;

const graph = (state = { vertexList: [], edgeList: [], mouseDownVertex: false }, action) => {
    if (action.from != 'GRAPH')
        return state;

    const controlsState = store.getState().controls.action;

    switch (action.type) {
        case 'DOUBLE_CLICK_VERTEX':
            if (controlsState == 'DELETE') {
                return {
                    ...state,
                    vertexList: state.vertexList.filter(e => {
                        if (e.id != action.id)
                            return e;
                    }),
                    edgeList: state.edgeList.filter(e => {
                        if (e.from.id != action.id && e.to.id != action.id)
                            return e;
                    })
                }
            }

            return state;
        case 'MOUSE_DOWN_VERTEX':
            return { ...state, mouseDownVertex: true, mouseDownId: action.id };
        case 'MOUSE_MOVE':
            if (state.mouseDownVertex && controlsState == 'MOVE') {
                return {
                    ...state,
                    vertexList: state.vertexList.map(e => {
                        if (e.id == state.mouseDownId) {
                            e.x = action.x;
                            e.y = action.y;
                        }

                        return e;
                    })
                }
            }

            return state;
        case 'MOUSE_UP_VERTEX':
            if (state.mouseDownVertex && controlsState == 'ADD')
                return {
                    ...state,
                    edgeList: [...state.edgeList, {
                        id: nextEdgeId++,
                        from: state.vertexList.find(e => { return e.id == state.mouseDownId; }),
                        to: state.vertexList.find(e => { return e.id == action.id; })
                    }],
                };

            return { ...state };
        case 'CLICK_SVG':
            if (controlsState != 'ADD' || state.mouseDownVertex == true)
                return {...state, mouseDownVertex: false};

            return {
                ...state,
                vertexList: [...state.vertexList, {
                    id: nextVertexId++,
                    label: nextVertexId,
                    adjacentes: [],
                    x: action.x,
                    y: action.y,
                    selected: false
                }]
            };
        default:
            return state;
    }
};

export { graph };
