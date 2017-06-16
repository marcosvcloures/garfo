const ControlsEdit = (state = { action: 'ADD', displayLabel: true, directionalEdges: true }, action) => {
    if (action.from !== 'CONTROLS_EDIT')
        return state;

    switch (action.type) {
        case 'SELECT':
        case 'MOVE':
        case 'DELETE':
        case 'ADD':
            return { ...state, action: action.type };
        default:
            return state;
    }
}

export default ControlsEdit;