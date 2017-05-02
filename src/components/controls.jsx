import React from 'react';
import { store } from "../store/index.jsx";
import { Button, Icon } from 'react-materialize';

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
        return <Button waves='light' className={this.props.actived == true ? 'actived' : ''} onClick={(e) => {
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
        return (
            <div id="controls">
                <ControlsItem dispatch="MOVE" text="Mover" />
                <ControlsItem dispatch="ADD_EDGES" text="Inserir arestas" />
                <ControlsItem dispatch="DELETE" text="Deletar" />
            </div>
        );
    }
}

export { Controls };