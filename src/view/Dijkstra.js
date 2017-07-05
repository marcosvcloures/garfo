import React from 'react';
import ReactDOM from "react-dom";

import Algorithm from './Algorithm.js';

class Modal extends React.Component {
    state = { shown: true }

    componentWillMount() {
        setTimeout(() => { ReactDOM.findDOMNode(this).style.opacity = 1 });
    }

    render() {
        return this.state.shown === false ? null :
            <div className="modal">
                <div className="modal-content">
                    <h4>Escolha o vértice inicial</h4>
                    <div className="row">
                        <h6>O algoritmo de Dijkstra precisa de um vértice inicial!<br />
                            Para escolher o vértice inicial, basta clicar em cima do vértice desejado.</h6>
                    </div>
                </div>
                <div className="modal-footer center-align">
                    <button className="waves-effect waves-blue btn-flat"
                        onClick={(e) => {
                            ReactDOM.findDOMNode(this).style.opacity = 0;

                            setTimeout(() => this.setState({ shown: false }), 500);
                        }}>
                        Entendi!
                    </button>
                </div>
            </div>;
    }
}

const Init = () => {

}

class Dijkstra extends React.Component {
    omponentWillMount() {
        Init();
    }

    render() {
        return <span>
            <Modal />
            <Algorithm />
        </span>;
    }
}

export default Dijkstra;