import React, { Component } from 'react';
import store from '../store/index.js';

class Item extends Component {
    render() {
        let valid = false;

        for (let it in this.props)
            if (it !== 'filter' && this.props[it].toLowerCase().lastIndexOf(this.props.filter.toLowerCase()) !== -1) {
                valid = true

                break
            }

        if (!this.props.filter || valid)
            return <div className="col s12 m6 l4">
                <div className="card small teal lighten-2 hoverable" onClick={(e) => {
                    store.dispatch({
                        type: 'SET_PAGE',
                        id: this.props.id
                    })
                }}>
                    <div className="card-content white-text">
                        <span className="card-title">{this.props.name}</span>
                        <p>{this.props.desc}</p>
                    </div>
                    <div className="card-action center-align teal darken-2">
                        <a>Acessar</a>
                    </div>
                </div>
            </div>
        return null
    }
}

class Home extends Component {
    state = { searching: false, searchFor: '' }

    render() {
        return <div className="container">
            <div className={"search " + (this.state.searching ? " active" : "")} onClick={() => this.setState({ searching: true })}>
                {this.state.searching ?
                    <input type="text" placeholder="Pesquisar..." autoFocus
                        onFocus={e => e.target.select()}
                        onBlur={() => this.setState({ searching: false })}
                        value={this.state.searchFor}
                        onChange={e => this.setState({ searchFor: e.target.value })} />
                    :
                    <i className="material-icons left">search</i>
                }
            </div>
            <div className="row">
                <Item id='Edit' name='Editar grafo' desc='Edite o grafo utilizado para a execução dos algoritmos.' filter={this.state.searchFor} />
                <Item id='Kruskal' name='Kruskal' desc='Um dos algoritmos mais famosos para o problema da árvore geradora mínima (MST).' filter={this.state.searchFor} />
                <Item id='Dijkstra' name='Dijkstra' desc='O algoritmo mais utilizado para o problema do caminho mínimo entre de fonte única. (SSSP)' filter={this.state.searchFor} />
                <Item id='Prim' name='Prim' desc='Famoso algoritmo para a resolução do problema da árvore geradora mínima (MST).' filter={this.state.searchFor} />
                <Item id='BFS' name='Busca em largura' desc='Algoritmo que percorre o grafo em largura (BFS).' filter={this.state.searchFor} />
                <Item id='DFS' name='Busca em profundidade' desc='Algoritmo que percorre o grafo em profundidade (DFS).' filter={this.state.searchFor} />
            </div>
        </div>;
    }
}

export default Home;