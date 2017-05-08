import { store } from "./index.jsx"

const graph = (state = { vertexList: [], edgeList: [], mouseDownVertex: false, nextVertexId: 0, nextEdgeId: 0, edgeSelected: null, vertexSelected: null }, action) => {
    if (action.from != 'GRAPH')
        return state;

    const controlsState = store.getState().controls.action;

    switch (action.type) {
        case 'SAVE_VERTEX':
            return {...state, vertexSelected: null}
        case 'CLICK_EDGE': {
            if (controlsState == 'SELECT' && state.vertexSelected == null && state.edgeSelected == null) {
                return {
                    ...state,
                    edgeSelected: state.edgeList.find(e => { e.id == action.id })
                }
            }
        }
        case 'CLICK_VERTEX': {
            if (controlsState == 'SELECT' && state.vertexSelected == null && state.edgeSelected == null) {
                console.log(action.vertex);
                return {
                    ...state,
                    vertexSelected: action.vertex
                }
            }
        }
        case 'DOUBLE_CLICK_EDGE': {
            if (controlsState == 'DELETE') {
                return {
                    ...state,
                    edgeList: state.edgeList.filter(e => {
                        if (e.id != action.id)
                            return e;
                    })
                }
            }

            return state;
        }
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
                        id: state.nextEdgeId,
                        from: state.vertexList.find(e => { return e.id == state.mouseDownId; }),
                        to: state.vertexList.find(e => { return e.id == action.id; })
                    }],
                    nextEdgeId: state.nextEdgeId + 1
                };

            return { ...state };
        case 'CLICK_SVG':
            if (controlsState != 'ADD' || state.mouseDownVertex == true)
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
        default:
            return state;
    }
};

export { graph };
