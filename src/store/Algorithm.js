const Algorithm = (state = { edgeList: [], vertexList: [], playing: false, speed: 1 }, action) => {
    switch (action.type) {
        case 'PLAY_PAUSE':
            return { ...state, playing: !state.playing, step: null };
        case 'SPEED_CHANGE':
            return { ...state, speed: action.value };
        case 'VERTEX_CLICK':
            return { ...state, clicked_vertex: action.id };
        case 'ALGORITHM_INIT':
            return {edgeList: action.edgeList, vertexList: action.vertexList, playing: false,
                finished: false, started: false, step_func: action.step_func, init_func: action.init_func, speed: 1 };
        case 'ALGORITHM_STEP':
            return {...state, edgeList: action.edgeList, vertexList: action.vertexList, started: true };
        case 'ALGORITHM_FINISH':
            return {...state, edgeList: action.edgeList, vertexList: action.vertexList, playing: false,
                finished: true };
        default:
            return state;
    }
};

export default Algorithm;