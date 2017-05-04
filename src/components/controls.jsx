import React from 'react';
import { store } from "../store/index.jsx";
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
        });}}>{this.props.text}</Button>
    }
    
}

class Controls extends React.Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const displayLabel = store.getState().controls.display_label;

        return (
            <div id="controls">
                <ControlsItem dispatch="MOVE" text="Mover" />
                <ControlsItem dispatch="ADD" text="Inserir" />
                <ControlsItem dispatch="DELETE" text="Remover" />
                <Input type='checkbox' checked={displayLabel} label='Motrar índice dos vértices' onChange={e => {store.dispatch({
                    type: "DISPLAY_LABEL",
                    from: 'CONTROLS',
                    props: this
                })}} />
            </div>
        );
    }
}

export { Controls };