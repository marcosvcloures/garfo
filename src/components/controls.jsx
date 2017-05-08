import React from 'react';
import { store } from "../store/index.jsx";
import { ActionCreators } from 'redux-undo';
import { Button, Input, Icon } from 'react-materialize';

class ControlsItem extends React.Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const controlsState = store.getState().controls.action;

        return <Button waves='light' className={this.props.dispatch == controlsState ? 'active' : ''} onClick={(e) => {
            store.dispatch({
                type: this.props.dispatch,
                from: 'CONTROLS'
            });
        }}>{this.props.text.map}</Button>
    }

}

class Controls extends React.Component {
    handleKeyPress = e => {
        if (e.code == "KeyZ" && e.ctrlKey)
            return store.dispatch(ActionCreators.undo());
        if (e.code == "KeyY" && e.ctrlKey)
            return store.dispatch(ActionCreators.redo());
        if (e.code == "KeyS")
            return store.dispatch({
                type: "SELECT",
                from: 'CONTROLS'
            });
        if (e.code == "KeyM")
            return store.dispatch({
                type: "MOVE",
                from: 'CONTROLS'
            });
        if (e.code == "KeyI")
            return store.dispatch({
                type: "ADD",
                from: 'CONTROLS'
            });
        if (e.code == "KeyR")
            return store.dispatch({
                type: "DELETE",
                from: 'CONTROLS'
            });
    }

    componentDidMount() {
        window.addEventListener('keypress', this.handleKeyPress);

        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.handleKeyPress);

        this.unsubscribe();
    }

    render() {
        const displayLabel = store.getState().controls.displayLabel;
        const directionalEdges = store.getState().controls.directionalEdges;

        return (
            <div id="controls">
                <ControlsItem dispatch="SELECT" text="&Selecionar" />
                <ControlsItem dispatch="MOVE" text="Mover" />
                <ControlsItem dispatch="ADD" text="Inserir" />
                <ControlsItem dispatch="DELETE" text="Remover" />
                <Input type='checkbox' checked={displayLabel} label='Motrar índice dos vértices' onChange={e => {
                    store.dispatch({
                        type: "DISPLAY_LABEL",
                        from: 'CONTROLS',
                        props: this
                    })
                }} />
                <Input type='checkbox' checked={directionalEdges} label='Arestas direcionais' onChange={e => {
                    store.dispatch({
                        type: "DIRECTIONAL_EDGES",
                        from: 'CONTROLS',
                        props: this
                    })
                }} />
            </div>
        );
    }
}

export { Controls };