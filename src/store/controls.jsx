const controls = (state = { action: 'ADD', displayLabel: true, directionalEdges: true }, action) => {
    if (action.from != 'CONTROLS')
        return state;

    switch (action.type) {
        case 'SELECT':
        case 'MOVE':
        case 'DELETE':
        case 'ADD':
            return {...state, action: action.type};
        case 'DISPLAY_LABEL':
            return {...state, displayLabel: !state.displayLabel};
        case 'DIRECTIONAL_EDGES':
            return {...state, directionalEdges: !state.directionalEdges};
        default:
            return state;
    }
}

export { controls };