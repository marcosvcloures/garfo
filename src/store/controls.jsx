const controls = (state = {action: 'ADD_VERTEX', display_label: true}, action) => {
    if (action.from != 'CONTROLS')
        return state;

    switch (action.type) {
        case 'MOVE':
        case 'DELETE_VERTEX':
        case 'ADD_EDGES':
        case 'ADD_VERTEX':
            state.action = action.type;

            return state;
        case 'DISPLAY_LABEL':
            state.display_label = !state.display_label;

            return state;
        default:
            return state;
    }
}

export { controls };