import store from "./index.js";

const Graph = (state = document.cookie ?
    {
        ...JSON.parse(document.cookie),
        vertexSelected: null, mouseDownVertex: false, edgeSelected: null
    }
    :
    {
        vertexList: [], edgeList: [], mouseDownVertex: false, edgeSelected: null, vertexSelected: null,
        directionalEdges: true, weightedEdges: true
    }, action) => {
    if (action.from !== 'GRAPH')
        return state;

    const controlsState = store.getState().ControlsEdit.action;

    switch (action.type) {
        case 'CLEAR_GRAPH':
            return {
                vertexList: [], edgeList: [], mouseDownVertex: false, edgeSelected: null, vertexSelected: null,
                directionalEdges: true, weightedEdges: true
            };
        case 'SAVE_VERTEX':
            const newVertexList = state.vertexList.map(e => {
                if (e.id === state.vertexSelected.id)
                    return {
                        ...e,
                        label: action.label
                    }

                return e;
            });

            return {
                ...state,
                vertexList: newVertexList,
                edgeList: state.edgeList.map(e => {
                    return {
                        ...e,
                        from: newVertexList[e.from.id],
                        to: newVertexList[e.to.id]
                    }
                }),
                vertexSelected: null
            }
        case 'SAVE_EDGE':
            return {
                ...state,
                edgeList: state.edgeList.map(e => {
                    if (e.id === state.edgeSelected.id)
                        return {
                            ...e,
                            weight: action.weight,
                            capacity: action.capacity
                        }

                    return e;
                }),
                edgeSelected: null
            }
        case 'CLICK_EDGE': {
            if (controlsState === 'SELECT' && state.vertexSelected == null && state.edgeSelected == null) {
                return {
                    ...state,
                    edgeSelected: state.edgeList.find(e => e.id === action.id)
                }
            }

            return state;
        }
        case 'CLICK_VERTEX': {
            if (controlsState === 'SELECT' && state.vertexSelected == null && state.edgeSelected == null) {
                return {
                    ...state,
                    vertexSelected: state.vertexList.find(e => e.id === action.id)
                }
            }

            return state;
        }
        case 'DOUBLE_CLICK_EDGE': {
            if (controlsState === 'DELETE') {
                return {
                    ...state,
                    edgeList: state.edgeList.filter(e => e.id !== action.id).map(e => {
                        return {
                            ...e,
                            id: e.id < action.id ? e.id : e.id - 1
                        }
                    })
                }
            }

            return state;
        }
        case 'DOUBLE_CLICK_VERTEX':
            if (controlsState === 'DELETE') {
                let edgeId = 0;
                const newVertexList = state.vertexList.filter(e => e.id !== action.id).map(e => {
                    return {
                        ...e,
                        id: e.id < action.id ? e.id : e.id - 1
                    }
                });

                return {
                    ...state,
                    vertexList: newVertexList,
                    edgeList: state.edgeList.filter(e => e.from.id !== action.id && e.to.id !== action.id).map(e => {
                        return {
                            ...e,
                            id: edgeId++,
                            from: e.from.id < action.id ? newVertexList[e.from.id] : newVertexList[e.from.id - 1],
                            to: e.to.id < action.id ? newVertexList[e.to.id] : newVertexList[e.to.id - 1]
                        }
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
            if (state.mouseDownVertex && controlsState === 'ADD') {
                if (state.edgeList.findIndex(e => e.from.id === state.mouseDownId && e.to.id === action.id) !== -1)
                    return state;

                return {
                    ...state,
                    edgeList: [...state.edgeList.map(e => {
                        if (e.from.id === action.id && e.to.id === state.mouseDownId)
                            return {
                                ...e,
                                opositeEdge: true
                            }

                        return e;
                    }), {
                        id: state.edgeList.length,
                        from: state.vertexList[state.mouseDownId],
                        to: state.vertexList[action.id],
                        opositeEdge: state.edgeList.findIndex(e => e.from.id === action.id && e.to.id === state.mouseDownId) !== -1,
                        weight: 1,
                        capacity: 0
                    }]
                };

            }

            return state;
        case 'MOUSE_UP_SVG':
            if (controlsState !== 'ADD' || state.mouseDownVertex === true)
                return { ...state, mouseDownVertex: false };

            return {
                ...state,
                vertexList: [...state.vertexList, {
                    id: state.vertexList.length,
                    label: state.vertexList.length + 1,
                    x: action.x,
                    y: action.y,
                    selected: false
                }]
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