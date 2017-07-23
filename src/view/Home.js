import React, { Component } from 'react';
import store from '../store/index.js';

class Home extends Component {
    render() {
        return <div className="container">
            <div className="row">
                <div className="col s12 m6 l4">
                    <div className="card small teal lighten-2 hoverable" onClick={(e) => {
                        store.dispatch({
                            type: 'SET_PAGE',
                            id: 'Edit'
                        })
                    }}>
                        <div className="card-content white-text">
                            <span className="card-title">Editar grafo</span>
                            <p>Edite o grafo utilizado para a execução dos algoritmos.</p>
                        </div>
                        <div className="card-action center-align teal darken-2">
                            <a>Acessar</a>
                        </div>
                    </div>
                </div>
                <div className="col s12 m6 l4">
                    <div className="card small teal lighten-2 hoverable" onClick={(e) => {
                        store.dispatch({
                            type: 'SET_PAGE',
                            id: 'Kruskal'
                        })
                    }}>
                        <div className="card-content white-text">
                            <span className="card-title">Kruskal</span>
                            <p>Um dos algoritmos mais famosos para o problema da árvore geradora mínima.</p>
                        </div>
                        <div className="card-action center-align teal darken-2">
                            <a>Acessar</a>
                        </div>
                    </div>
                </div>
                <div className="col s12 m6 l4">
                    <div className="card small teal lighten-2 hoverable" onClick={(e) => {
                        store.dispatch({
                            type: 'SET_PAGE',
                            id: 'Dijkstra'
                        })
                    }}>
                        <div className="card-content white-text">
                            <span className="card-title">Dijkstra</span>
                            <p>O algoritmo mais utilizado para o problema do caminho mínimo entre dois vértices.</p>
                        </div>
                        <div className="card-action center-align teal darken-2">
                            <a>Acessar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default Home;