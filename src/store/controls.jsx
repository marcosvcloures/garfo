const controls = (state = ['MOVE'], action) => {
    if (action.from != 'CONTROLS')
        return state;

    switch (action.type) {
        case 'MOVE':
        case 'DELETE':
        case 'ADD_EDGES':
            return action.type;
        default:
            return state;
    }
}

export { controls };