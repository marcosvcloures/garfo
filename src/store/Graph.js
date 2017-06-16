import store from "./index.js";

const Graph = (state = {
    vertexList: [], edgeList: [], mouseDownVertex: false, nextVertexId: 0,
    nextEdgeId: 0, edgeSelected: null, vertexSelected: null, directionalEdges: true, weightedEdges: true
},
    action) => {

    if (action.from !== 'GRAPH')
        return state;

    const controlsState = store.getState().ControlsEdit.action;

    switch (action.type) {
        case 'SAVE_VERTEX':
            return {
                ...state,
                vertexList: state.vertexList.map((e) => {
                    if (e.id === state.vertexSelected.id)
                        e.label = action.label;
                    return e;
                }),
                vertexSelected: null
            }
        case 'SAVE_EDGE':
            return {
                ...state,
                edgeList: state.edgeList.map((e) => {
                    if (e.id === state.edgeSelected.id) {
                        e.weight = action.weight;
                        e.capacity = action.capacity;
                    }
                    return e;
                }),
                edgeSelected: null
            }
        case 'CLICK_EDGE': {
            if (controlsState === 'SELECT' && state.vertexSelected == null && state.edgeSelected == null) {
                return {
                    ...state,
                    edgeSelected: state.edgeList.find((e) => { return e.id === action.id })
                }
            }
            return state;
        }
        case 'CLICK_VERTEX': {
            if (controlsState === 'SELECT' && state.vertexSelected == null && state.edgeSelected == null) {
                return {
                    ...state,
                    vertexSelected: state.vertexList.find((e) => { return e.id === action.id })
                }
            }

            return state;
        }
        case 'DOUBLE_CLICK_EDGE': {
            if (controlsState === 'DELETE') {
                return {
                    ...state,
                    edgeList: state.edgeList.filter(e => {
                        return e.id !== action.id;
                    })
                }
            }

            return state;
        }
        case 'DOUBLE_CLICK_VERTEX':
            if (controlsState === 'DELETE') {
                return {
                    ...state,
                    vertexList: state.vertexList.filter(e => {
                        return e.id !== action.id;
                    }),
                    edgeList: state.edgeList.filter(e => {
                        return e.from.id !== action.id && e.to.id !== action.id;
                    })
                }
            }

            return state;
        case 'MOUSE_DOWN_VERTEX':
            return { ...state, mouseDownVertex: true, mouseDownId: action.id };
        case 'MOUSE_MOVE':
            if (state.mouseDownVertex && controlsState === 'MOVE') {
                return {
                    ...state,
                    vertexList: state.vertexList.map(e => {
                        if (e.id === state.mouseDownId) {
                            e.x = action.x;
                            e.y = action.y;
                        }

                        return e;
                    })
                }
            }

            return state;
        case 'MOUSE_UP_VERTEX':
            if (state.mouseDownVertex && controlsState === 'ADD')
                return {
                    ...state,
                    edgeList: [...state.edgeList, {
                        id: state.nextEdgeId,
                        from: state.vertexList.find(e => { return e.id === state.mouseDownId; }),
                        to: state.vertexList.find(e => { return e.id === action.id; }),
                        weight: 1
                    }],
                    nextEdgeId: state.nextEdgeId + 1
                };

            return { ...state };
        case 'CLICK_SVG':
            if (controlsState !== 'ADD' || state.mouseDownVertex === true)
                return { ...state, mouseDownVertex: false };

            return {
                ...state,
                vertexList: [...state.vertexList, {
                    id: state.nextVertexId,
                    label: state.nextVertexId,
                    x: action.x,
                    y: action.y,
                    selected: false
                }],
                nextVertexId: state.nextVertexId + 1
            };
        case 'DIRECTIONAL_EDGES':
            return { ...state, directionalEdges: !state.directionalEdges };
        case 'WEIGHTED_EDGES':
            return { ...state, weightedEdges: !state.weightedEdges };
        default:
            return state;
    }
};

export default Graph;
